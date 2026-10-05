import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISlide } from '../../../core/models/slide.interface';
import { BauhausIconComponent } from '../../../shared/ui/bauhaus-icon/bauhaus-icon.component';
import { BauhausBadgeComponent } from '../../../shared/ui/bauhaus-badge/bauhaus-badge.component';

@Component({
  selector: 'app-presenter-notes',
  standalone: true,
  imports: [CommonModule, BauhausIconComponent, BauhausBadgeComponent],
  template: `
    <div class="presenter-drawer" [class.open]="isOpen()">
      <div class="drawer-header">
        <div class="header-title-group">
          <app-bauhaus-icon name="file-text" [size]="18"></app-bauhaus-icon>
          <span class="drawer-title">PRESENTER NOTES & TELEPROMPTER</span>
          <app-bauhaus-badge variant="primary">SPEAKER VIEW</app-bauhaus-badge>
        </div>
        <button class="close-btn" (click)="closeClicked.emit()" title="Tutup Catatan (N / Esc)">
          <app-bauhaus-icon name="minimize" [size]="16"></app-bauhaus-icon>
        </button>
      </div>

      <div class="drawer-body">
        <!-- Speaker & Topic Meta -->
        <div class="drawer-meta-banner">
          <div class="meta-speaker">
            <span class="speaker-tag">PEMBICARA:</span>
            <strong>Rafi Indrajati</strong>
            <span class="speaker-team">&bull; TSI BRINS</span>
          </div>

          <div class="meta-timer">
            <span class="timer-tag">WAKTU BERJALAN:</span>
            <span class="timer-display">{{ formattedElapsed() }}</span>
          </div>
        </div>

        <div class="drawer-columns-layout">
          <!-- Left: Current Slide Speaking Cues -->
          <div class="cues-column">
            <div class="column-heading">
              <span class="step-badge">SLIDE {{ currentSlide().slideNumber }}</span>
              <h3>{{ currentSlide().title }}</h3>
            </div>

            <div class="cues-list">
              <span class="cues-title">POIN BICARA (TALKING POINTS):</span>
              @if (currentSlide().notes && currentSlide().notes!.length > 0) {
                <ul>
                  @for (note of currentSlide().notes; track note) {
                    <li class="cue-item">
                      <div class="cue-bullet"></div>
                      <p>{{ note }}</p>
                    </li>
                  }
                </ul>
              } @else {
                <p class="empty-cues">Fokuskan pada artikulasi verbal dan dialog dengan audiens.</p>
              }
            </div>

            @if (currentSlide().keyTakeaway) {
              <div class="takeaway-reminder">
                <span class="reminder-tag">PESAN KUNCI SLIDE INI:</span>
                <p>{{ currentSlide().keyTakeaway }}</p>
              </div>
            }
          </div>

          <!-- Right: Upcoming Slide Preview -->
          <div class="preview-column">
            <div class="next-slide-header">
              <span class="next-tag">SLIDE BERIKUTNYA</span>
              @if (nextSlide()) {
                <span class="next-num">Slide {{ nextSlide()!.slideNumber }}</span>
              }
            </div>

            @if (nextSlide()) {
              <div class="next-slide-card" (click)="jumpToNext.emit()">
                <div class="card-accent-top"></div>
                <span class="next-category">{{ nextSlide()!.categoryLabel }}</span>
                <h4 class="next-title">{{ nextSlide()!.title }}</h4>
                <p class="next-sub">{{ nextSlide()!.subtitle }}</p>
                <div class="click-hint">
                  <app-bauhaus-icon name="arrow-right" [size]="14"></app-bauhaus-icon>
                  <span>Klik untuk lanjut ke slide ini</span>
                </div>
              </div>
            } @else {
              <div class="end-deck-card">
                <app-bauhaus-icon name="check" [size]="24"></app-bauhaus-icon>
                <span>Ini adalah slide terakhir presentasi</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      bottom: 50px;
      left: 0;
      right: 0;
      z-index: 40;
      pointer-events: none;
    }

    .presenter-drawer {
      height: 280px;
      background-color: var(--color-surface);
      border-top: 3px solid var(--color-primary);
      border-bottom: 2px solid var(--color-border);
      box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15);
      transform: translateY(100%);
      transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      pointer-events: auto;
    }

    .presenter-drawer.open {
      transform: translateY(0);
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      background-color: var(--color-surface-subtle);
      border-bottom: 2px solid var(--color-border);
    }

    .header-title-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .drawer-title {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
    }

    .close-btn {
      background: transparent;
      border: 1px solid var(--color-border);
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--color-text-primary);
    }
    .close-btn:hover {
      background-color: var(--color-primary);
      color: #FFFFFF;
    }

    .drawer-body {
      flex: 1;
      padding: 12px 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .drawer-meta-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--color-surface-subtle);
      border: 1.5px solid var(--color-border);
      padding: 6px 12px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }

    .speaker-tag, .timer-tag {
      color: var(--color-neutral-muted);
      margin-right: 6px;
    }

    .timer-display {
      font-weight: 700;
      color: var(--color-primary);
      font-size: 0.85rem;
    }

    .drawer-columns-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
      flex: 1;
    }

    .cues-column {
      border: 1.5px solid var(--color-border);
      background-color: var(--color-surface);
      padding: 12px;
      overflow-y: auto;
    }

    .column-heading {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }

    .step-badge {
      background-color: var(--color-secondary);
      color: #FFFFFF;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      padding: 2px 6px;
    }

    .column-heading h3 {
      font-size: 1rem;
    }

    .cues-title {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--color-primary);
      display: block;
      margin-bottom: 6px;
    }

    .cues-list ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .cue-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.85rem;
      line-height: 1.35;
    }

    .cue-bullet {
      width: 6px;
      height: 6px;
      background-color: var(--color-primary);
      margin-top: 6px;
      flex-shrink: 0;
    }

    .takeaway-reminder {
      margin-top: 10px;
      padding: 8px 10px;
      background-color: rgba(244, 211, 94, 0.15);
      border-left: 3px solid var(--color-tertiary);
      font-size: 0.8rem;
    }

    .reminder-tag {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--color-secondary);
      display: block;
    }

    /* Right Preview */
    .preview-column {
      border: 1.5px solid var(--color-border);
      background-color: var(--color-surface-subtle);
      padding: 10px;
      display: flex;
      flex-direction: column;
    }

    .next-slide-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
    }

    .next-tag {
      color: var(--color-neutral-muted);
    }
    .next-num {
      color: var(--color-primary);
    }

    .next-slide-card {
      background-color: var(--color-surface);
      border: 1.5px solid var(--color-border);
      padding: 10px;
      cursor: pointer;
      transition: all 150ms ease;
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .next-slide-card:hover {
      box-shadow: 3px 3px 0px var(--color-border);
      transform: translate(-1px, -1px);
    }

    .card-accent-top {
      height: 4px;
      background-color: var(--color-primary);
      margin-bottom: 6px;
    }

    .next-category {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-neutral-muted);
      text-transform: uppercase;
    }

    .next-title {
      font-size: 0.88rem;
      margin: 2px 0 4px;
    }

    .next-sub {
      font-size: 0.75rem;
      color: var(--color-text-secondary);
      line-height: 1.25;
    }

    .click-hint {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--color-primary);
      font-weight: 700;
    }

    .end-deck-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 8px;
      color: var(--color-neutral-muted);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-align: center;
    }
  `]
})
export class PresenterNotesComponent {
  readonly currentSlide = input.required<ISlide>();
  readonly nextSlide = input<ISlide | null>(null);
  readonly isOpen = input<boolean>(false);
  readonly formattedElapsed = input<string>('00:00');

  readonly closeClicked = output<void>();
  readonly jumpToNext = output<void>();
}
