import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BauhausButtonComponent } from '../../../shared/ui/bauhaus-button/bauhaus-button.component';
import { BauhausIconComponent } from '../../../shared/ui/bauhaus-icon/bauhaus-icon.component';
import { BauhausProgressBarComponent } from '../../../shared/ui/bauhaus-progress-bar/bauhaus-progress-bar.component';

@Component({
  selector: 'app-controls-bar',
  standalone: true,
  imports: [
    CommonModule,
    BauhausButtonComponent,
    BauhausIconComponent,
    BauhausProgressBarComponent
  ],
  template: `
    <div class="controls-toolbar">
      <!-- Integrated Progress Track -->
      <app-bauhaus-progress-bar
        [currentSlideIndex]="currentIndex()"
        [totalSlides]="totalSlides()"
        [progressPercent]="progressPercent()"
        (slideSelected)="slideSelected.emit($event)"
      ></app-bauhaus-progress-bar>

      <div class="controls-main-row">
        <!-- Left: Slide Navigation & Counter -->
        <div class="toolbar-section-left">
          <div class="nav-buttons-group">
            <app-bauhaus-button
              variant="outline"
              size="sm"
              [disabled]="!canPrev()"
              (clicked)="prevClicked.emit()"
              title="Slide Sebelumnya (ArrowLeft)"
            >
              <app-bauhaus-icon name="arrow-left" [size]="16"></app-bauhaus-icon>
              <span>SEBELUMNYA</span>
            </app-bauhaus-button>

            <app-bauhaus-button
              variant="primary"
              size="sm"
              [disabled]="!canNext()"
              (clicked)="nextClicked.emit()"
              title="Slide Selanjutnya (ArrowRight / Space)"
            >
              <span>SELANJUTNYA</span>
              <app-bauhaus-icon name="arrow-right" [size]="16"></app-bauhaus-icon>
            </app-bauhaus-button>
          </div>

          <div class="slide-counter-badge">
            <span class="count-curr">{{ currentIndex() < 10 ? '0' + currentIndex() : currentIndex() }}</span>
            <span class="count-divider">/</span>
            <span class="count-total">{{ totalSlides() - 1 < 10 ? '0' + (totalSlides() - 1) : totalSlides() - 1 }}</span>
          </div>

          <!-- Stopwatch Timer -->
          <div class="stopwatch-badge" [class.timer-running]="isTimerRunning()">
            <app-bauhaus-icon name="clock" [size]="14"></app-bauhaus-icon>
            <span class="stopwatch-time">{{ formattedElapsed() }}</span>
            <button
              class="timer-control-btn"
              (click)="isTimerRunning() ? pauseTimer.emit() : startTimer.emit()"
              [title]="isTimerRunning() ? 'Jeda Timer' : 'Mulai Timer'"
            >
              <app-bauhaus-icon [name]="isTimerRunning() ? 'pause' : 'play'" [size]="12"></app-bauhaus-icon>
            </button>
            <button class="timer-control-btn" (click)="resetTimer.emit()" title="Reset Timer">
              <app-bauhaus-icon name="history" [size]="12"></app-bauhaus-icon>
            </button>
          </div>
        </div>

        <!-- Center: Slide Title Teaser -->
        <div class="toolbar-section-center">
          <span class="center-title">{{ currentSlideTitle() }}</span>
        </div>

        <!-- Right: View Modes & Settings -->
        <div class="toolbar-section-right">
          <!-- Auto-Play Slideshow -->
          <button
            class="tool-icon-btn"
            [class.active]="isAutoPlaying()"
            (click)="toggleAutoPlay.emit()"
            [title]="isAutoPlaying() ? 'Hentikan Putar Otomatis (P)' : 'Mulai Putar Otomatis (P)'"
          >
            <app-bauhaus-icon [name]="isAutoPlaying() ? 'pause' : 'play'" [size]="16"></app-bauhaus-icon>
            <span class="btn-tooltip-label">{{ isAutoPlaying() ? 'AUTO ON' : 'AUTO' }}</span>
          </button>

          <!-- Slide Sorter Grid View (PowerPoint Grid) -->
          <button
            class="tool-icon-btn"
            [class.active]="isSorterOpen()"
            (click)="toggleSorter.emit()"
            title="Slide Sorter Grid (S)"
          >
            <app-bauhaus-icon name="grid" [size]="16"></app-bauhaus-icon>
            <span class="btn-tooltip-label">GRID</span>
          </button>

          <!-- Presenter Notes Drawer -->
          <button
            class="tool-icon-btn"
            [class.active]="isNotesOpen()"
            (click)="toggleNotes.emit()"
            title="Catatan Pembicara (N)"
          >
            <app-bauhaus-icon name="file-text" [size]="16"></app-bauhaus-icon>
            <span class="btn-tooltip-label">NOTES</span>
          </button>

          <!-- Sound Toggle -->
          <button
            class="tool-icon-btn"
            (click)="toggleSound.emit()"
            [title]="isMuted() ? 'Aktifkan Suara (M)' : 'Bisukan Suara (M)'"
          >
            <app-bauhaus-icon [name]="isMuted() ? 'volume-x' : 'volume-2'" [size]="16"></app-bauhaus-icon>
          </button>

          <!-- Theme Toggle -->
          <button
            class="tool-icon-btn"
            (click)="toggleTheme.emit()"
            [title]="isDarkTheme() ? 'Tema Bauhaus Terang (T)' : 'Tema Bauhaus Gelap (T)'"
          >
            <app-bauhaus-icon [name]="isDarkTheme() ? 'sun' : 'moon'" [size]="16"></app-bauhaus-icon>
          </button>

          <!-- Fullscreen Toggle -->
          <button
            class="tool-icon-btn highlight"
            (click)="toggleFullscreen.emit()"
            [title]="isFullscreen() ? 'Keluar Layar Penuh (F / Esc)' : 'Layar Penuh (F)'"
          >
            <app-bauhaus-icon [name]="isFullscreen() ? 'minimize' : 'maximize'" [size]="16"></app-bauhaus-icon>
            <span class="btn-tooltip-label">F5</span>
          </button>

          <!-- Shortcuts Dialog -->
          <button
            class="tool-icon-btn"
            (click)="toggleShortcuts.emit()"
            title="Panduan Pintasan Keyboard (?)"
          >
            <app-bauhaus-icon name="help-circle" [size]="16"></app-bauhaus-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      background-color: var(--color-surface);
      border-top: 2px solid var(--color-border);
      position: relative;
      z-index: 30;
      flex-shrink: 0;
    }

    .controls-toolbar {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .controls-main-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      gap: 12px;
    }

    /* Left Group */
    .toolbar-section-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .nav-buttons-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .slide-counter-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      padding: 4px 10px;
      background-color: var(--color-surface-subtle);
      border: 1.5px solid var(--color-border);
      box-shadow: 2px 2px 0px var(--color-border);
    }
    .count-curr {
      color: var(--color-primary);
    }
    .count-divider {
      color: var(--color-neutral-muted);
    }

    .stopwatch-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      background-color: var(--color-surface-subtle);
      border: 1.5px solid var(--color-border);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
    }

    .stopwatch-badge.timer-running {
      border-color: var(--color-primary);
      background-color: rgba(230, 57, 70, 0.1);
    }

    .timer-control-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      transition: color 150ms ease;
    }
    .timer-control-btn:hover {
      color: var(--color-primary);
    }

    /* Center */
    .toolbar-section-center {
      flex: 1;
      display: flex;
      justify-content: center;
      overflow: hidden;
      padding: 0 1rem;
    }

    .center-title {
      font-family: var(--font-display);
      font-size: 0.88rem;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--color-text-primary);
    }

    /* Right Group */
    .toolbar-section-right {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .tool-icon-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background-color: var(--color-surface);
      border: 1.5px solid var(--color-border);
      color: var(--color-text-primary);
      padding: 6px 10px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 2px 2px 0px var(--color-border);
      transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .tool-icon-btn:hover {
      transform: translate(-1px, -1px);
      box-shadow: 3px 3px 0px var(--color-border);
      background-color: var(--color-surface-subtle);
    }

    .tool-icon-btn:active {
      transform: translate(1px, 1px);
      box-shadow: 1px 1px 0px var(--color-border);
    }

    .tool-icon-btn.active {
      background-color: var(--color-secondary);
      color: #FFFFFF;
    }

    .tool-icon-btn.highlight {
      background-color: var(--color-tertiary);
      color: #1A1A1A;
    }

    .btn-tooltip-label {
      font-size: 0.68rem;
      letter-spacing: 0.05em;
    }
  `]
})
export class ControlsBarComponent {
  readonly currentIndex = input.required<number>();
  readonly totalSlides = input.required<number>();
  readonly progressPercent = input.required<number>();
  readonly canNext = input.required<boolean>();
  readonly canPrev = input.required<boolean>();
  readonly currentSlideTitle = input<string>('');

  readonly isAutoPlaying = input<boolean>(false);
  readonly isSorterOpen = input<boolean>(false);
  readonly isNotesOpen = input<boolean>(false);
  readonly isDarkTheme = input<boolean>(false);
  readonly isMuted = input<boolean>(false);
  readonly isFullscreen = input<boolean>(false);

  readonly formattedElapsed = input<string>('00:00');
  readonly isTimerRunning = input<boolean>(false);

  readonly prevClicked = output<void>();
  readonly nextClicked = output<void>();
  readonly slideSelected = output<number>();
  readonly toggleAutoPlay = output<void>();
  readonly toggleSorter = output<void>();
  readonly toggleNotes = output<void>();
  readonly toggleTheme = output<void>();
  readonly toggleSound = output<void>();
  readonly toggleFullscreen = output<void>();
  readonly toggleShortcuts = output<void>();
  readonly startTimer = output<void>();
  readonly pauseTimer = output<void>();
  readonly resetTimer = output<void>();
}
