// details-display.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="details-container" *ngIf="details">
      <div class="header">
        <h3>
          <svg class="details-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="l 12,6 0,4"></path>
            <path d="l 12,14 0,.01"></path>
          </svg>
          Code Analysis Details
        </h3>
      </div>

      <div class="content">
        <div class="details-sections">
          <div class="section" *ngFor="let section of parsedSections">
            <div class="section-header">
              <div class="section-icon" [ngClass]="section.type">
                <svg *ngIf="section.type === 'usage'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4"></path>
                  <path d="M15 13h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4"></path>
                  <path d="M12 2L8 8l4 6 4-6-4-6Z"></path>
                </svg>
                <svg *ngIf="section.type === 'pros'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"></path>
                </svg>
                <svg *ngIf="section.type === 'cons'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <svg *ngIf="section.type === 'general'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <h4>{{ section.title }}</h4>
            </div>
            <div class="section-content" [innerHTML]="section.content"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="no-data" *ngIf="!details">
      <p>No detailed analysis available yet. Submit your code to see usage information, advantages, and disadvantages.</p>
    </div>
  `,
  styles: [`
    .details-container {
      margin: 20px;
      border: 1px solid #17a2b8;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header {
      background: linear-gradient(135deg, #17a2b8, #138496);
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

    .details-icon {
      width: 24px;
      height: 24px;
      stroke-width: 2;
    }

    .content {
      padding: 20px;
    }

    .details-sections {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .section {
      border: 1px solid #e9ecef;
      border-radius: 6px;
      overflow: hidden;
      background: #fff;
    }

    .section-header {
      background: #f8f9fa;
      padding: 15px 20px;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .section-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .section-icon svg {
      width: 20px;
      height: 20px;
      stroke-width: 2;
    }

    .section-icon.usage {
      background: #e3f2fd;
      color: #1976d2;
    }

    .section-icon.pros {
      background: #e8f5e8;
      color: #388e3c;
    }

    .section-icon.cons {
      background: #ffebee;
      color: #d32f2f;
    }

    .section-icon.general {
      background: #f3e5f5;
      color: #7b1fa2;
    }

    .section-header h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .section-content {
      padding: 20px;
      line-height: 1.6;
      color: #333;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .section-content :global(ul) {
      padding-left: 20px;
      margin: 15px 0;
    }

    .section-content :global(li) {
      margin: 8px 0;
      padding-left: 5px;
    }

    .section-content :global(p) {
      margin: 12px 0;
    }

    .section-content :global(strong) {
      font-weight: 600;
      color: #212529;
    }

    .section-content :global(code) {
      background: #f8f9fa;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #e83e8c;
      border: 1px solid #e9ecef;
      font-size: 0.9em;
    }

    .section-content :global(pre) {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      border: 1px solid #e9ecef;
      font-family: 'Courier New', monospace;
      margin: 15px 0;
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
      .details-container {
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

      .section-header {
        padding: 12px 15px;
      }

      .section-content {
        padding: 15px;
      }

      .section-icon {
        width: 35px;
        height: 35px;
      }

      .section-icon svg {
        width: 18px;
        height: 18px;
      }
    }
  `]
})
export class DetailsDisplayComponent {
  @Input() details: string | null = null;

  get parsedSections() {
    if (!this.details) return [];

    const sections = [];
    const text = this.details;

    // Try to identify different sections based on common patterns
    const usageMatch = text.match(/(?:use|usage|purpose|application)[\s\S]*?(?=(?:advantage|benefit|pro)|(?:disadvantage|drawback|con)|$)/i);
    const prosMatch = text.match(/(?:advantage|benefit|pro)[\s\S]*?(?=(?:disadvantage|drawback|con)|$)/i);
    const consMatch = text.match(/(?:disadvantage|drawback|con)[\s\S]*$/i);

    if (usageMatch) {
      sections.push({
        title: 'Usage & Purpose',
        type: 'usage',
        content: this.formatContent(usageMatch[0])
      });
    }

    if (prosMatch) {
      sections.push({
        title: 'Advantages & Benefits',
        type: 'pros',
        content: this.formatContent(prosMatch[0])
      });
    }

    if (consMatch) {
      sections.push({
        title: 'Disadvantages & Drawbacks',
        type: 'cons',
        content: this.formatContent(consMatch[0])
      });
    }

    // If no specific sections found, treat as general content
    if (sections.length === 0) {
      sections.push({
        title: 'Analysis Details',
        type: 'general',
        content: this.formatContent(text)
      });
    }

    return sections;
  }

  private formatContent(content: string): string {
    if (!content) return '';

    // Format the content with basic HTML styling
    return content
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^\d+\.\s/gm, '<li>')
      .replace(/^-\s/gm, '<li>')
      .replace(/(<li>.*?)(?=<li>|$)/gs, '<ul>$1</ul>')
      .replace(/<ul><li>/g, '<ul><li>')
      .replace(/<\/ul><ul>/g, '')
      .replace(/<li>(?!.*<\/li>)/g, '<li>')
  }
}