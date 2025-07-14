// code-input.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface CodeResponse {
  Errors: string;
  Code: string;
  Details: string;
}

@Component({
  selector: 'app-code-input',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="code-input-container">
      <h2>Code Reviewer</h2>

      <div class="form-group">
        <label for="language-select">Programming Language:</label>
        <select
          id="language-select"
          [(ngModel)]="selectedLanguage"
          class="form-control">
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="cpp">C++</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="php">PHP</option>
          <option value="ruby">Ruby</option>
        </select>
      </div>

      <div class="form-group">
        <label for="code-area">Code:</label>
        <textarea
          id="code-area"
          [(ngModel)]="codeContent"
          placeholder="Enter your code here..."
          rows="15"
          class="form-control code-textarea">
        </textarea>
      </div>

      <div class="button-group">
        <button
          (click)="sendCode()"
          [disabled]="isLoading || !codeContent.trim()"
          class="btn btn-primary">
          {{ isLoading ? 'Analyzing...' : 'Send Code' }}
        </button>

        <button
          (click)="clearCode()"
          [disabled]="isLoading"
          class="btn btn-secondary">
          Clear
        </button>
      </div>

      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .code-input-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .code-textarea {
      font-family: 'Courier New', monospace;
      resize: vertical;
      min-height: 300px;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: #545b62;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      margin-top: 15px;
      padding: 10px;
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
    }

    h2 {
      color: #333;
      margin-bottom: 30px;
    }
  `]
})
export class CodeInputComponent {
  selectedLanguage = 'javascript';
  codeContent = '';
  isLoading = false;
  errorMessage = '';

  @Output() codeAnalyzed = new EventEmitter<CodeResponse>();

  constructor(private http: HttpClient) {}

  sendCode() {
    if (!this.codeContent.trim()) {
      this.errorMessage = 'Please enter some code to analyze.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const payload = { code: this.codeContent };

    this.http.post<CodeResponse>('http://localhost:8000/analyze', payload)
      .subscribe({
        next: (response) => {
          this.codeAnalyzed.emit(response);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error analyzing code:', error);
          this.errorMessage = 'Failed to analyze code. Please try again.';
          this.isLoading = false;
        }
      });
  }

  clearCode() {
    this.codeContent = '';
    this.errorMessage = '';
    this.selectedLanguage = 'javascript';
  }
}