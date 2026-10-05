import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bauhaus-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="progress-track"
      role="progressbar"
      [attr.aria-valuenow]="currentSlideIndex()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="totalSlides() - 1"
      (click)="onTrackClick($event)"
      title="Klik untuk melompat ke slide"
    >
      <div
        class="progress-fill"
        [style.width.%]="progressPercent()"
      ></div>
      <div class="progress-segments">
        @for (idx of segmentArray(); track idx) {
          <div
            class="segment-tick"
            [class.active]="idx <= currentSlideIndex()"
            [class.current]="idx === currentSlideIndex()"
          ></div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .progress-track {
      position: relative;
      height: 8px;
      background-color: var(--color-surface-subtle);
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      cursor: pointer;
      overflow: hidden;
      transition: height 150ms ease;
    }

    .progress-track:hover {
      height: 12px;
    }

    .progress-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
      transition: width 220ms cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 1;
    }

    .progress-segments {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      z-index: 2;
      pointer-events: none;
    }

    .segment-tick {
      flex: 1;
      border-right: 1px solid rgba(0, 0, 0, 0.2);
      height: 100%;
      transition: background-color 150ms ease;
    }

    .segment-tick:last-child {
      border-right: none;
    }

    .segment-tick.current {
      background-color: var(--color-tertiary);
      opacity: 0.6;
    }
  `]
})
export class BauhausProgressBarComponent {
  readonly currentSlideIndex = input.required<number>();
  readonly totalSlides = input.required<number>();
  readonly progressPercent = input.required<number>();

  readonly slideSelected = output<number>();

  protected segmentArray(): number[] {
    const total = this.totalSlides();
    return Array.from({ length: total }, (_, i) => i);
  }

  protected onTrackClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIndex = Math.round(ratio * (this.totalSlides() - 1));
    this.slideSelected.emit(targetIndex);
  }
}
