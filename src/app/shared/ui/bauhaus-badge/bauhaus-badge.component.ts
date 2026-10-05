import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BauhausBadgeVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'neutral';

@Component({
  selector: 'app-bauhaus-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses()">
      @if (dot()) {
        <span class="badge-dot"></span>
      }
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .bauhaus-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 8px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border-radius: 0px !important;
      border: 1px solid var(--color-border);
      line-height: 1.3;
      white-space: nowrap;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      background-color: currentColor;
      border-radius: 0px; /* square dot */
    }

    .badge-primary {
      background-color: var(--color-primary);
      color: #FFFFFF;
      border-color: var(--color-primary);
    }

    .badge-secondary {
      background-color: var(--color-secondary);
      color: #FFFFFF;
      border-color: var(--color-secondary);
    }

    .badge-tertiary {
      background-color: var(--color-tertiary);
      color: #1A1A1A;
      border-color: #1A1A1A;
    }

    .badge-outline {
      background-color: transparent;
      color: var(--color-text-primary);
      border-color: var(--color-border);
    }

    .badge-neutral {
      background-color: var(--color-neutral);
      color: var(--color-text-inverse);
    }
  `]
})
export class BauhausBadgeComponent {
  readonly variant = input<BauhausBadgeVariant>('outline');
  readonly dot = input<boolean>(false);

  protected badgeClasses(): string {
    return `bauhaus-badge badge-${this.variant()}`;
  }
}
