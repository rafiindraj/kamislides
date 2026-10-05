import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BauhausButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'ghost'
  | 'outline';

export type BauhausButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-bauhaus-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="buttonClasses()"
      (click)="clicked.emit($event)"
    >
      <span class="btn-inner">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-weight: 600;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 0px !important; /* Strict Bauhaus 0px */
      transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      user-select: none;
      outline: none;
      white-space: nowrap;
    }

    button:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 3px;
    }

    button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      box-shadow: none !important;
      transform: none !important;
    }

    /* Sizes */
    .btn-sm {
      padding: 6px 12px;
      font-size: 0.75rem;
      gap: 6px;
      border: 1.5px solid var(--color-border);
    }

    .btn-md {
      padding: 10px 18px;
      font-size: 0.875rem;
      gap: 8px;
      border: 2px solid var(--color-border);
    }

    .btn-lg {
      padding: 14px 26px;
      font-size: 1rem;
      gap: 10px;
      border: 2.5px solid var(--color-border);
    }

    /* Variants */
    .btn-primary {
      background-color: var(--color-primary);
      color: #FFFFFF;
      box-shadow: var(--shadow-subtle);
    }
    .btn-primary:hover:not(:disabled) {
      transform: translate(-2px, -2px);
      box-shadow: var(--shadow-hover);
    }
    .btn-primary:active:not(:disabled) {
      transform: translate(2px, 2px);
      box-shadow: var(--shadow-active);
    }

    .btn-secondary {
      background-color: var(--color-secondary);
      color: #FFFFFF;
      box-shadow: var(--shadow-subtle);
    }
    .btn-secondary:hover:not(:disabled) {
      transform: translate(-2px, -2px);
      box-shadow: var(--shadow-hover);
    }
    .btn-secondary:active:not(:disabled) {
      transform: translate(2px, 2px);
      box-shadow: var(--shadow-active);
    }

    .btn-tertiary {
      background-color: var(--color-tertiary);
      color: #1A1A1A;
      box-shadow: var(--shadow-subtle);
    }
    .btn-tertiary:hover:not(:disabled) {
      transform: translate(-2px, -2px);
      box-shadow: var(--shadow-hover);
    }
    .btn-tertiary:active:not(:disabled) {
      transform: translate(2px, 2px);
      box-shadow: var(--shadow-active);
    }

    .btn-outline {
      background-color: var(--color-surface);
      color: var(--color-text-primary);
      box-shadow: var(--shadow-subtle);
    }
    .btn-outline:hover:not(:disabled) {
      background-color: var(--color-surface-subtle);
      transform: translate(-2px, -2px);
      box-shadow: var(--shadow-hover);
    }
    .btn-outline:active:not(:disabled) {
      transform: translate(2px, 2px);
      box-shadow: var(--shadow-active);
    }

    .btn-ghost {
      background-color: transparent;
      color: var(--color-text-primary);
      border-color: transparent;
    }
    .btn-ghost:hover:not(:disabled) {
      background-color: var(--color-surface-subtle);
      border-color: var(--color-border);
    }
    .btn-ghost:active:not(:disabled) {
      transform: translate(1px, 1px);
    }

    .btn-accent {
      background-color: var(--color-accent);
      color: var(--color-neutral);
      box-shadow: var(--shadow-subtle);
    }

    .btn-inner {
      display: inline-flex;
      align-items: center;
      gap: inherit;
    }
  `]
})
export class BauhausButtonComponent {
  readonly variant = input<BauhausButtonVariant>('primary');
  readonly size = input<BauhausButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);

  readonly clicked = output<MouseEvent>();

  protected buttonClasses(): string {
    return `btn-${this.variant()} btn-${this.size()}`;
  }
}
