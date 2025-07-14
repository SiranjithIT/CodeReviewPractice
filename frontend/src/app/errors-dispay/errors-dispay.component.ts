// errors-display.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-errors-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="errors-container" *ngIf="errors">
      <div class="header">
        <h3>
          <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Code Analysis & Errors
        </h3>
      </div>

      <div class="content">
        <div class="errors-content" [innerHTML]="formattedErrors"></div>
      </div>
    </div>

    <div class="no-data" *ngIf="!errors">
      <p>No analysis results yet. Submit your code to see potential errors and issues.</p>
    </div>
  `,
  styles: [`
    .errors-container {
      margin: 20px;
      border: 1px solid #dc3545;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header {
      background: linear-gradient(135deg, #dc3545, #c82333);
      color: white;
      padding: 15px 20px;
      border-radius: 7px 7px 0 0;
    }

    .header h3 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      font-weight: 600;
    }

    .error-icon {
      width: 24px;
      height: 24px;
      stroke-width: 2;
    }

    .content {
      padding: 20px;
    }

    .errors-content {
      line-height: 1.6;
      color: #333;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .errors-content :global(ul) {
      padding-left: 20px;
      margin: 10px 0;
    }

    .errors-content :global(li) {
      margin: 8px 0;
      padding-left: 5px;
    }

    .errors-content :global(code) {
      background: #f8f9fa;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #e83e8c;
      border: 1px solid #e9ecef;
    }

    .errors-content :global(pre) {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      border: 1px solid #e9ecef;
      font-family: 'Courier New', monospace;
      margin: 15px 0;
    }

    .errors-content :global(strong) {
      color: #dc3545;
      font-weight: 600;
    }

    .errors-content :global(p) {
      margin: 12px 0;
    }

    .no-data {
      margin: 20px;
      padding: 40px 20px;
      text-align: center;
      color: #6c757d;
      border: 2px dashed #dee2e6;
      border-radius: 8px;
      background: #f8f9fa;
    }

    .no-data p {
      margin: 0;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .errors-container {
        margin: 10px;
      }

      .header {
        padding: 12px 15px;
      }

      .content {
        padding: 15px;
      }

      .header h3 {
        font-size: 16px;
      }
    }
  `]
})
export class ErrorsDisplayComponent {
  @Input() errors: string | null = null;

  get formattedErrors(): string {
    if (!this.errors) return '';

    // Convert line breaks to HTML and preserve formatting
    return this.errors
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^\d+\.\s/gm, '<li>')
      .replace(/^-\s/gm, '<li>')
      .replace(/(<li>.*?)(?=<li>|$)/gs, '<ul>$1</ul>')
      .replace(/<ul><li>/g, '<ul><li>')
      .replace(/<\/ul><ul>/g, '')
      .replace(/<li>(?!.*<\/li>)/g, '<li>')
      .replace(/(<li>.*?)(<br>|$)/g, '$1</li>');
  }
}