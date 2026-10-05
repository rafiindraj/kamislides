import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BauhausIconComponent } from '../bauhaus-icon/bauhaus-icon.component';

@Component({
  selector: 'app-bauhaus-code-block',
  standalone: true,
  imports: [CommonModule, BauhausIconComponent],
  template: `
    <div class="code-container">
      <div class="code-header">
        <div class="terminal-dots">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-blue"></span>
        </div>
        <span class="code-lang">{{ language() | uppercase }}</span>
        <button class="copy-btn" (click)="copyCode()" [title]="isCopied() ? 'Tersalin!' : 'Salin Kode'">
          <app-bauhaus-icon [name]="isCopied() ? 'check' : 'copy'" [size]="14"></app-bauhaus-icon>
          <span>{{ isCopied() ? 'TERSALIN' : 'SALIN' }}</span>
        </button>
      </div>

      <div class="code-body">
        <table class="code-table">
          <tbody>
            @for (line of lines(); track $index) {
              <tr [class.highlighted]="isLineHighlighted($index + 1)">
                <td class="line-number">{{ $index + 1 }}</td>
                <td class="line-content">
                  <code>{{ line }}</code>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (callout()) {
        <div class="code-callout">
          <div class="callout-header">
            <span class="callout-tag">CATATAN PENTING</span>
            <strong>{{ callout() }}</strong>
          </div>
          <p class="callout-text">{{ explanation() }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .code-container {
      background-color: var(--code-bg);
      border: 2px solid var(--color-border);
      box-shadow: var(--shadow-subtle);
      border-radius: 0px !important;
      overflow: hidden;
      font-family: var(--font-mono);
    }

    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 14px;
      background-color: #121417;
      border-bottom: 2px solid var(--color-border);
    }

    .terminal-dots {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 0px; /* square Bauhaus terminal dots */
      border: 1px solid rgba(0, 0, 0, 0.4);
    }
    .dot-red { background-color: var(--color-primary); }
    .dot-yellow { background-color: var(--color-tertiary); }
    .dot-blue { background-color: var(--color-secondary); }

    .code-lang {
      font-size: 0.75rem;
      font-weight: 700;
      color: #94A3B8;
      letter-spacing: 0.08em;
    }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: transparent;
      border: 1px solid #475569;
      color: #CBD5E1;
      padding: 3px 8px;
      font-size: 0.7rem;
      cursor: pointer;
      font-family: var(--font-mono);
      transition: all 150ms ease;
    }
    .copy-btn:hover {
      background-color: var(--color-primary);
      color: #FFFFFF;
      border-color: var(--color-primary);
    }

    .code-body {
      padding: 1rem 0;
      overflow-x: auto;
      max-height: 400px;
    }

    .code-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }

    .code-table tr {
      transition: background-color 150ms ease;
    }

    .code-table tr.highlighted {
      background-color: rgba(230, 57, 70, 0.25);
      border-left: 4px solid var(--color-primary);
    }

    .line-number {
      width: 44px;
      text-align: right;
      padding: 2px 14px 2px 8px;
      color: #64748B;
      user-select: none;
      font-size: 0.82rem;
    }

    .line-content {
      padding: 2px 16px;
      color: var(--code-text);
      white-space: pre;
    }

    .line-content code {
      background: none;
      font-family: inherit;
    }

    .code-callout {
      padding: 12px 16px;
      background-color: rgba(244, 211, 94, 0.12);
      border-top: 2px dashed var(--color-tertiary);
      color: var(--code-text);
    }

    .callout-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }

    .callout-tag {
      background-color: var(--color-tertiary);
      color: #1A1A1A;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 2px 6px;
    }

    .callout-text {
      font-size: 0.875rem;
      color: #E2E8F0;
      line-height: 1.5;
      font-style: italic;
    }
  `]
})
export class BauhausCodeBlockComponent {
  readonly language = input<string>('typescript');
  readonly code = input.required<string>();
  readonly highlightLines = input<number[]>([]);
  readonly callout = input<string | undefined>(undefined);
  readonly explanation = input<string | undefined>(undefined);

  readonly isCopied = signal<boolean>(false);

  protected lines(): string[] {
    return this.code().trim().split('\n');
  }

  protected isLineHighlighted(lineNum: number): boolean {
    return this.highlightLines().includes(lineNum);
  }

  protected copyCode(): void {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(this.code()).then(() => {
        this.isCopied.set(true);
        setTimeout(() => this.isCopied.set(false), 2000);
      });
    }
  }
}
