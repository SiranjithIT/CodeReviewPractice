from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from langchain_core.messages import SystemMessage, HumanMessage
import json
import re
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

class CodeRequest(BaseModel):
    code: str

class CodeResponse(BaseModel):
    Errors: str
    Code: str
    Details: str

app = FastAPI(
    title="Code Analyzer API",
    description="AI-powered code analysis and optimization service",
    version="1.0.0"
)

# Add CORS middleware to handle Angular requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],  # Angular dev server
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Initialize the LLM
try:
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
    logger.info("LLM initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize LLM: {e}")
    llm = None

def extract_json_string(model_output: str) -> dict:
    """Extract and parse JSON from model output"""
    try:
        # Remove markdown code blocks if present
        cleaned = re.sub(r"^```json\s*|\s*```$", "", model_output.strip(), flags=re.IGNORECASE | re.MULTILINE)
        
        # Try to find JSON object in the response
        json_match = re.search(r'\{.*\}', cleaned, re.DOTALL)
        if json_match:
            json_str = json_match.group()
            return json.loads(json_str)
        else:
            # If no JSON found, try to parse the entire cleaned string
            return json.loads(cleaned)
            
    except json.JSONDecodeError as e:
        logger.error(f"JSON parsing failed: {e}")
        logger.error(f"Raw output: {model_output}")
        
        # Return a structured error response
        return {
            "Errors": "Failed to parse AI response. The model may have returned malformed JSON.",
            "Code": "// Unable to generate optimized code due to parsing error",
            "Details": f"Technical error: {str(e)}\n\nRaw response: {cleaned[:500]}..."
        }

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Code Analyzer API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "llm_available": llm is not None,
        "version": "1.0.0"
    }

@app.post("/analyze", response_model=CodeResponse)
async def analyze_code(request: CodeRequest) -> CodeResponse:
    """Analyze code for errors, optimization, and details"""
    
    if not llm:
        raise HTTPException(
            status_code=500, 
            detail="LLM service is not available. Please check your configuration."
        )
    
    if not request.code or not request.code.strip():
        raise HTTPException(
            status_code=400,
            detail="Code field is required and cannot be empty"
        )
    
    try:
        logger.info(f"Analyzing code snippet of length: {len(request.code)}")
        
        system_prompt = SystemMessage(content="""
You are an AI Agent capable of reviewing the given code and performing the following operations:

1) Check the code for potential bugs, logical errors, and syntax errors
2) Produce optimized or corrected code with improvements
3) Explain the code's purpose, advantages, and disadvantages

IMPORTANT: You must respond with valid JSON in exactly this format:
{
  "Errors": "Detailed analysis of bugs, logical errors, and syntax issues found in the code. If no errors are found, explain that the code looks correct.",
  "Code": "The optimized, corrected, or improved version of the code with proper formatting and best practices applied.",
  "Details": "Comprehensive explanation including: code purpose, use cases, advantages, disadvantages, and any additional insights."
}

Ensure your response is valid JSON and follows this exact structure.
        """)

        messages = [system_prompt, HumanMessage(content=request.code)]
        
        # Get response from LLM
        response = llm.invoke(messages)
        logger.info("LLM response received")
        
        # Parse the response
        response_body = extract_json_string(response.content)
        
        # Validate response structure
        required_fields = ["Errors", "Code", "Details"]
        for field in required_fields:
            if field not in response_body:
                response_body[field] = f"Missing {field} in AI response"
        
        # Ensure all fields are strings
        for field in required_fields:
            if not isinstance(response_body[field], str):
                response_body[field] = str(response_body[field])
        
        logger.info("Code analysis completed successfully")
        return CodeResponse(**response_body)
        
    except Exception as e:
        logger.error(f"Error during code analysis: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error during code analysis: {str(e)}"
        )

@app.post("/")
async def legacy_analyze_code(input: CodeRequest) -> dict:
    """Legacy endpoint for backward compatibility"""
    try:
        result = await analyze_code(input)
        return result.dict()
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in legacy endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {"error": "Endpoint not found", "detail": "Please use /analyze endpoint for code analysis"}

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    logger.error(f"Internal server error: {exc}")
    return {"error": "Internal server error", "detail": "Please try again later"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",  # Adjust this if your file is named differently
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )