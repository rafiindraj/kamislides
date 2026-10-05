import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AudioFeedbackService } from './audio-feedback.service';

export interface IPresentationTimerService {
  elapsedSeconds(): number;
  formattedElapsed(): string;
  isRunning(): boolean;
  start(): void;
  pause(): void;
  reset(): void;
}

@Injectable({
  providedIn: 'root'
})
export class PresentationTimerService implements IPresentationTimerService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly audioService = inject(AudioFeedbackService);

  readonly elapsedSeconds = signal<number>(0);
  readonly isRunning = signal<boolean>(false);

  // Micro-timer for slide 11 (20-20-20 rule & Pomodoro demo)
  readonly microTimerRemaining = signal<number>(20);
  readonly isMicroTimerActive = signal<boolean>(false);
  private microInterval: ReturnType<typeof setInterval> | null = null;

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  readonly formattedElapsed = computed(() => {
    const total = this.elapsedSeconds();
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  start(): void {
    if (this.isRunning()) return;
    this.isRunning.set(true);
    if (isPlatformBrowser(this.platformId)) {
      this.timerInterval = setInterval(() => {
        this.elapsedSeconds.update(s => s + 1);
      }, 1000);
    }
  }

  pause(): void {
    this.isRunning.set(false);
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  reset(): void {
    this.pause();
    this.elapsedSeconds.set(0);
  }

  // Interactive 20-second eye relaxation exercise
  start20SecondExercise(): void {
    if (this.microInterval) clearInterval(this.microInterval);
    this.microTimerRemaining.set(20);
    this.isMicroTimerActive.set(true);
    this.audioService.playChime();

    if (isPlatformBrowser(this.platformId)) {
      this.microInterval = setInterval(() => {
        this.microTimerRemaining.update(rem => {
          if (rem <= 1) {
            clearInterval(this.microInterval!);
            this.microInterval = null;
            this.isMicroTimerActive.set(false);
            this.audioService.playChime();
            return 0;
          }
          return rem - 1;
        });
      }, 1000);
    }
  }

  cancel20SecondExercise(): void {
    if (this.microInterval) {
      clearInterval(this.microInterval);
      this.microInterval = null;
    }
    this.isMicroTimerActive.set(false);
    this.microTimerRemaining.set(20);
  }
}
