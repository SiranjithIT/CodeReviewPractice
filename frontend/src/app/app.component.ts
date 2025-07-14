// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeInputComponent } from './code-input/code-input.component';
import { ErrorsDisplayComponent } from './errors-dispay/errors-dispay.component';
import { OptimizedCodeComponent } from './optimized-code/optimized-code.component';
import { DetailsDisplayComponent } from './details-display/details-display.component';


interface CodeResponse {
  Errors: string;
  Code: string;
  Details: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CodeInputComponent,
    ErrorsDisplayComponent,
    OptimizedCodeComponent,
    DetailsDisplayComponent
  ],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="16,18 22,12 16,6"></polyline>
            <polyline points="8,6 2,12 8,18"></polyline>
          </svg>
          Code Analyzer & Optimizer
        </h1>
        <p class="subtitle">Analyze your code for errors, get optimized versions, and understand the details</p>
      </header>

      <main class="main-content">
        <!-- Code Input Section -->
        <section class="input-section">
          <app-code-input (codeAnalyzed)="onCodeAnalyzed($event)"></app-code-input>
        </section>

        <!-- Results Section -->
        <section class="results-section" *ngIf="analysisResult">
          <div class="results-grid">
            <!-- Errors Display -->
            <div class="result-card">
              <app-errors-display [errors]="analysisResult.Errors"></app-errors-display>
            </div>

            <!-- Optimized Code Display -->
            <div class="result-card">
              <app-optimized-code [optimizedCode]="analysisResult.Code"></app-optimized-code>
            </div>

            <!-- Details Display -->
            <div class="result-card full-width">
              <app-details-display [details]="analysisResult.Details"></app-details-display>
            </div>
          </div>
        </section>

        <!-- Empty State -->
        <section class="empty-state" *ngIf="!analysisResult">
          <div class="empty-content">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            <h2>Ready to Analyze Your Code</h2>
            <p>Submit your code above to get detailed analysis including error detection, code optimization, and comprehensive insights.</p>
            <div class="features">
              <div class="feature">
                <span class="feature-icon">🔍</span>
                <span>Error Detection</span>
              </div>
              <div class="feature">
                <span class="feature-icon">⚡</span>
                <span>Code Optimization</span>
              </div>
              <div class="feature">
                <span class="feature-icon">📊</span>
                <span>Detailed Analysis</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="app-footer">
        <p>&copy; 2024 Code Analyzer. Powered by AI for better code quality.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .app-header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 30px 20px;
      text-align: center;
      color: white;
    }

    .app-header h1 {
      margin: 0 0 10px 0;
      font-size: 2.5rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
    }

    .logo-icon {
      width: 40px;
      height: 40px;
      stroke-width: 2.5;
    }

    .subtitle {
      margin: 0;
      font-size: 1.1rem;
      opacity: 0.9;
      font-weight: 300;
    }

    .main-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .input-section {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      margin: 30px 0;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .results-section {
      margin: 30px 0;
    }

    .results-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .result-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .result-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .result-card.full-width {
      grid-column: 1 / -1;
    }

    .empty-state {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      margin: 50px 0;
    }

    .empty-content {
      text-align: center;
      color: white;
      max-width: 600px;
      padding: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .empty-icon {
      width: 80px;
      height: 80px;
      stroke-width: 1.5;
      margin-bottom: 20px;
      opacity: 0.8;
    }

    .empty-content h2 {
      margin: 0 0 15px 0;
      font-size: 2rem;
      font-weight: 600;
    }

    .empty-content p {
      margin: 0 0 30px 0;
      font-size: 1.1rem;
      opacity: 0.9;
      line-height: 1.6;
    }

    .features {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
    }

    .feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
    }

    .feature-icon {
      font-size: 2rem;
      margin-bottom: 5px;
    }

    .app-footer {
      background: rgba(0, 0, 0, 0.2);
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      padding: 20px;
      margin-top: 50px;
    }

    .app-footer p {
      margin: 0;
      font-size: 0.9rem;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .results-grid {
        grid-template-columns: 1fr;
      }

      .result-card.full-width {
        grid-column: 1;
      }
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 0 10px;
      }

      .app-header {
        padding: 20px 15px;
      }

      .app-header h1 {
        font-size: 2rem;
        flex-direction: column;
        gap: 10px;
      }

      .logo-icon {
        width: 35px;
        height: 35px;
      }

      .subtitle {
        font-size: 1rem;
      }

      .input-section,
      .results-section {
        margin: 20px 0;
      }

      .results-grid {
        gap: 15px;
      }

      .empty-content {
        padding: 30px 20px;
        margin: 0 10px;
      }

      .empty-content h2 {
        font-size: 1.5rem;
      }

      .features {
        gap: 20px;
      }

      .feature {
        font-size: 0.8rem;
      }

      .feature-icon {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .app-header h1 {
        font-size: 1.5rem;
      }

      .features {
        flex-direction: column;
        gap: 15px;
      }
    }

    /* Global component overrides */
    :global(.code-input-container),
    :global(.errors-container),
    :global(.code-container),
    :global(.details-container) {
      margin: 0 !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    :global(.no-data) {
      margin: 0 !important;
      background: transparent !important;
      border: none !important;
      color: #6c757d !important;
    }
  `]
})
export class AppComponent {
  analysisResult: CodeResponse | null = null;

  onCodeAnalyzed(result: CodeResponse) {
    this.analysisResult = result;

    // Scroll to results section
    setTimeout(() => {
      const resultsSection = document.querySelector('.results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}