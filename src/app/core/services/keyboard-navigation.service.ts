import { Injectable, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SlideManagerService } from './slide-manager.service';
import { ThemeService } from './theme.service';
import { AudioFeedbackService } from './audio-feedback.service';

@Injectable({
  providedIn: 'root'
})
export class KeyboardNavigationService {
  private readonly slideManager = inject(SlideManagerService);
  private readonly themeService = inject(ThemeService);
  private readonly audioService = inject(AudioFeedbackService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private isListening = false;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.isListening) return;
    this.isListening = true;

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('keydown', this.handleKeyDown.bind(this));
    });
  }

  private handleKeyDown(event: KeyboardEvent): void {
    // Ignore keystrokes when typing inside inputs, textareas, etc.
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || (activeEl as HTMLElement).isContentEditable)) {
      if (event.key === 'Escape') {
        (activeEl as HTMLElement).blur();
      }
      return;
    }

    let handled = true;

    this.ngZone.run(() => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          this.slideManager.nextSlide();
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
        case 'Backspace':
        case 'PageUp':
          this.slideManager.prevSlide();
          break;

        case 'Home':
          this.slideManager.firstSlide();
          break;

        case 'End':
          this.slideManager.lastSlide();
          break;

        case 'f':
        case 'F':
        case 'F5':
          this.slideManager.toggleFullscreen();
          break;

        case 's':
        case 'S':
          this.slideManager.toggleSorter();
          break;

        case 'b':
        case 'B':
          this.slideManager.toggleSidebar();
          break;

        case 'n':
        case 'N':
          this.slideManager.toggleNotes();
          break;

        case 't':
        case 'T':
          this.themeService.toggleTheme();
          break;

        case 'm':
        case 'M':
          this.audioService.toggleSound();
          break;

        case 'p':
        case 'P':
          this.slideManager.toggleAutoPlay();
          break;

        case '?':
        case '/':
          this.slideManager.toggleShortcuts();
          break;

        case 'Escape':
          if (this.slideManager.isShortcutsModalOpen()) {
            this.slideManager.toggleShortcuts();
          } else if (this.slideManager.isSorterOpen()) {
            this.slideManager.toggleSorter();
          } else if (this.slideManager.isNotesOpen()) {
            this.slideManager.toggleNotes();
          } else if (this.slideManager.isFullscreen()) {
            this.slideManager.toggleFullscreen();
          }
          break;

        default:
          handled = false;
          break;
      }
    });

    if (handled && event.key !== 'F12' && event.key !== 'Tab') {
      event.preventDefault();
    }
  }
}
