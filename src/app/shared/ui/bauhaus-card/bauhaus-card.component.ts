import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BauhausCardVariant =
  | 'default'
  | 'bordered'
  | 'accent-red'
  | 'accent-blue'
  | 'accent-yellow'
  | 'dark'
  | 'subtle';

@Component({
  selector: 'app-bauhaus-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses()">
      @if (accentColor()) {
        <div class="card-accent-bar" [style.background-color]="accentColor()"></div>
      }
      <div class="card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .bauhaus-card {
      position: relative;
      background-color: var(--color-surface-card);
      border: 2px solid var(--color-border);
      border-radius: 0px !important;
      box-shadow: var(--shadow-subtle);
      transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .card-hover:hover {
      transform: translate(-3px, -3px);
      box-shadow: var(--shadow-hover);
    }

    .card-accent-bar {
      height: 6px;
      width: 100%;
    }

    .card-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* Variant stylings */
    .variant-accent-red {
      border-top: 6px solid var(--color-primary);
    }

    .variant-accent-blue {
      border-top: 6px solid var(--color-secondary);
    }

    .variant-accent-yellow {
      border-top: 6px solid var(--color-tertiary);
    }

    .variant-dark {
      background-color: var(--color-neutral);
      color: #FFFFFF;
      border-color: var(--color-border);
    }

    .variant-subtle {
      background-color: var(--color-surface-subtle);
      border: 1.5px solid var(--color-border-subtle);
      box-shadow: 2px 2px 0px rgba(0,0,0,0.06);
    }
  `]
})
export class BauhausCardComponent {
  readonly variant = input<BauhausCardVariant>('default');
  readonly hoverable = input<boolean>(true);
  readonly accentColor = input<string | null>(null);

  protected cardClasses(): string {
    const classes = ['bauhaus-card', `variant-${this.variant()}`];
    if (this.hoverable()) classes.push('card-hover');
    return classes.join(' ');
  }
}
