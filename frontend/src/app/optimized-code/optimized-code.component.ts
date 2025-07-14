// optimized-code.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-optimized-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-container" *ngIf="optimizedCode">
      <div class="header">
        <h3>
          <svg class="code-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="16,18 22,12 16,6"></polyline>
            <polyline points="8,6 2,12 8,18"></polyline>
          </svg>
          Optimized Code
        </h3>
        <button
          class="copy-btn"
          (click)="copyToClipboard()"
          [class.copied]="isCopied">
          <svg *ngIf="!isCopied" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="m5,15H4a2,2 0 0,1-2-2V4a2,2 0 0,1,2-2H9a2,2 0 0,1,2,2v1"></path>
          </svg>
          <svg *ngIf="isCopied" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
          {{ isCopied ? 'Copied!' : 'Copy' }}
        </button>
      </div>

      <div class="content">
        <pre class="code-block"><code [innerHTML]="highlightedCode"></code></pre>
      </div>
    </div>

    <div class="no-data" *ngIf="!optimizedCode">
      <p>No optimized code available yet. Submit your code for analysis to see improvements.</p>
    </div>
  `,
  styles: [`
    .code-container {
      margin: 20px;
      border: 1px solid #28a745;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header h3 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      font-weight: 600;
    }

    .code-icon {
      width: 24px;
      height: 24px;
      stroke-width: 2;
    }

    .copy-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
    }

    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .copy-btn.copied {
      background: rgba(255, 255, 255, 0.9);
      color: #28a745;
    }

    .copy-btn svg {
      width: 16px;
      height: 16px;
      stroke-width: 2;
    }

    .content {
      padding: 0;
      overflow-x: auto;
    }

    .code-block {
      margin: 0;
      padding: 20px;
      background: #f8f9fa;
      font-family: 'Courier New', Monaco, 'Lucida Console', monospace;
      font-size: 14px;
      line-height: 1.5;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
      border: none;
      color: #212529;
    }

    .code-block code {
      font-family: inherit;
      font-size: inherit;
      background: none;
      padding: 0;
      color: inherit;
    }

    /* Basic syntax highlighting styles */
    .code-block :global(.keyword) {
      color: #d73a49;
      font-weight: bold;
    }

    .code-block :global(.string) {
      color: #032f62;
    }

    .code-block :global(.comment) {
      color: #6a737d;
      font-style: italic;
    }

    .code-block :global(.number) {
      color: #005cc5;
    }

    .code-block :global(.function) {
      color: #6f42c1;
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
      .code-container {
        margin: 10px;
      }

      .header {
        padding: 12px 15px;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
      }

      .header h3 {
        font-size: 16px;
      }

      .copy-btn {
        align-self: flex-end;
      }

      .code-block {
        padding: 15px;
        font-size: 13px;
      }
    }
  `]
})
export class OptimizedCodeComponent {
  @Input() optimizedCode: string | null = null;
  isCopied = false;

  get highlightedCode(): string {
    if (!this.optimizedCode) return '';

    // First, clean the code by removing markdown code blocks
    let cleanCode = this.cleanMarkdownCodeBlocks(this.optimizedCode);

    // Then apply syntax highlighting
    return this.applySyntaxHighlighting(cleanCode);
  }

  private cleanMarkdownCodeBlocks(code: string): string {
    // Remove markdown code blocks with language identifiers (e.g., ```python, ```javascript, etc.)
    // This regex matches:
    // - ``` followed by optional language identifier
    // - Any content (including newlines)
    // - Closing ```
    let cleaned = code.replace(/^```[\w]*\n?/gm, '').replace(/^```$/gm, '');

    // Also handle cases where there might be extra whitespace
    cleaned = cleaned.replace(/^```[\w]*\s*$/gm, '').replace(/^\s*```\s*$/gm, '');

    // Remove leading/trailing whitespace that might be left over
    cleaned = cleaned.trim();

    return cleaned;
  }

  private applySyntaxHighlighting(code: string): string {
    return code
      // Keywords - enhanced to include more programming languages
      .replace(/\b(function|var|let|const|if|else|elif|for|while|return|class|import|export|from|async|await|try|catch|finally|def|print|True|False|None|null|undefined|this|super|new|delete|typeof|instanceof|in|of|with|yield|break|continue|switch|case|default|do|goto|struct|union|enum|typedef|static|extern|register|auto|volatile|const|signed|unsigned|short|long|int|char|float|double|void|bool|string|list|dict|tuple|set)\b/g, '<span class="keyword">$1</span>')
      // Strings - handle both single and double quotes, including escaped quotes
      .replace(/(["'])((?:\\.|[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
      // Comments - single line comments for multiple languages
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
      .replace(/#.*$/gm, '<span class="comment">$&</span>')
      // Multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
      .replace(/'''[\s\S]*?'''/g, '<span class="comment">$&</span>')
      .replace(/"""[\s\S]*?"""/g, '<span class="comment">$&</span>')
      // Numbers - integers and floats
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
      // Functions - function names followed by parentheses
      .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span class="function">$1</span>');
  }

  get cleanCodeForCopy(): string {
    if (!this.optimizedCode) return '';
    return this.cleanMarkdownCodeBlocks(this.optimizedCode);
  }

  async copyToClipboard() {
    const codeToCopy = this.cleanCodeForCopy;
    if (!codeToCopy) return;

    try {
      await navigator.clipboard.writeText(codeToCopy);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = codeToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    }
  }
}