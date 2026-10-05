import { Injectable, signal, computed, inject, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ISlide } from '../models/slide.interface';
import { PRESENTATION_SLIDES } from '../data/presentation-slides.data';
import { AudioFeedbackService } from './audio-feedback.service';

export interface ISlideManagerService {
  slides(): readonly ISlide[];
  currentIndex(): number;
  currentSlide(): ISlide;
  totalSlides(): number;
  canNext(): boolean;
  canPrev(): boolean;
  progressPercent(): number;
  nextSlide(): void;
  prevSlide(): void;
  goToSlide(index: number): void;
  firstSlide(): void;
  lastSlide(): void;
}

@Injectable({
  providedIn: 'root'
})
export class SlideManagerService implements ISlideManagerService {
  private readonly audioService = inject(AudioFeedbackService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly slides = signal<readonly ISlide[]>(PRESENTATION_SLIDES);
  readonly currentIndex = signal<number>(0);

  // UI state toggles
  readonly isSorterOpen = signal<boolean>(false);
  readonly isSidebarOpen = signal<boolean>(true);
  readonly isNotesOpen = signal<boolean>(false);
  readonly isShortcutsModalOpen = signal<boolean>(false);
  readonly isAutoPlaying = signal<boolean>(false);
  readonly autoPlayIntervalSec = signal<number>(8);
  readonly isFullscreen = signal<boolean>(false);

  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;

  readonly currentSlide = computed(() => {
    const list = this.slides();
    const idx = Math.max(0, Math.min(this.currentIndex(), list.length - 1));
    return list[idx];
  });

  readonly totalSlides = computed(() => this.slides().length);

  readonly canNext = computed(() => this.currentIndex() < this.totalSlides() - 1);
  readonly canPrev = computed(() => this.currentIndex() > 0);

  readonly progressPercent = computed(() => {
    const total = this.totalSlides();
    if (total <= 1) return 100;
    return Math.round((this.currentIndex() / (total - 1)) * 100);
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Check URL hash if pointing to slide (e.g. #3)
      const hash = window.location.hash.replace('#', '');
      const initialIdx = parseInt(hash, 10);
      if (!isNaN(initialIdx) && initialIdx >= 0 && initialIdx < PRESENTATION_SLIDES.length) {
        this.currentIndex.set(initialIdx);
      }

      // Sync hash with current slide
      effect(() => {
        const idx = this.currentIndex();
        window.history.replaceState(null, '', `#${idx}`);
      });

      document.addEventListener('fullscreenchange', () => {
        this.isFullscreen.set(!!document.fullscreenElement);
      });
    }
  }

  nextSlide(): void {
    if (this.canNext()) {
      this.currentIndex.update(i => i + 1);
      this.audioService.playSlideChange();
    } else if (this.isAutoPlaying()) {
      this.stopAutoPlay();
    }
  }

  prevSlide(): void {
    if (this.canPrev()) {
      this.currentIndex.update(i => i - 1);
      this.audioService.playSlideChange();
    }
  }

  goToSlide(index: number): void {
    const maxIdx = this.totalSlides() - 1;
    const clamped = Math.max(0, Math.min(index, maxIdx));
    if (clamped !== this.currentIndex()) {
      this.currentIndex.set(clamped);
      this.audioService.playSlideChange();
    }
  }

  firstSlide(): void {
    this.goToSlide(0);
  }

  lastSlide(): void {
    this.goToSlide(this.totalSlides() - 1);
  }

  toggleSorter(): void {
    this.isSorterOpen.update(v => !v);
    this.audioService.playTactileClick();
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v);
    this.audioService.playTactileClick();
  }

  toggleNotes(): void {
    this.isNotesOpen.update(v => !v);
    this.audioService.playTactileClick();
  }

  toggleShortcuts(): void {
    this.isShortcutsModalOpen.update(v => !v);
    this.audioService.playTactileClick();
  }

  toggleAutoPlay(): void {
    if (this.isAutoPlaying()) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  startAutoPlay(): void {
    this.isAutoPlaying.set(true);
    this.audioService.playChime();
    this.clearAutoPlayTimer();
    this.autoPlayTimer = setInterval(() => {
      if (this.canNext()) {
        this.nextSlide();
      } else {
        this.stopAutoPlay();
      }
    }, this.autoPlayIntervalSec() * 1000);
  }

  stopAutoPlay(): void {
    this.isAutoPlaying.set(false);
    this.clearAutoPlayTimer();
  }

  private clearAutoPlayTimer(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  toggleFullscreen(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.isFullscreen()) {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          this.isFullscreen.set(false);
        }).catch(() => {
          this.isFullscreen.set(false);
        });
      } else {
        this.isFullscreen.set(false);
      }
    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().then(() => {
          this.isFullscreen.set(true);
        }).catch(() => {
          this.isFullscreen.set(true);
        });
      } else {
        this.isFullscreen.set(true);
      }
    }
  }
}
