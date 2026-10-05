import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface IAudioFeedbackService {
  isMuted(): boolean;
  toggleSound(): void;
  playSlideChange(): void;
  playTactileClick(): void;
  playChime(): void;
}

@Injectable({
  providedIn: 'root'
})
export class AudioFeedbackService implements IAudioFeedbackService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isMuted = signal<boolean>(false);
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedMute = localStorage.getItem('bauhaus_sound_muted');
      if (savedMute !== null) {
        this.isMuted.set(savedMute === 'true');
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  toggleSound(): void {
    this.isMuted.update(v => {
      const next = !v;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('bauhaus_sound_muted', String(next));
      }
      return next;
    });
  }

  playSlideChange(): void {
    if (this.isMuted()) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // AudioContext policy suppression fallback
    }
  }

  playTactileClick(): void {
    if (this.isMuted()) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext policy suppression fallback
    }
  }

  playChime(): void {
    if (this.isMuted()) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.03, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.22);
      });
    } catch {
      // AudioContext policy suppression fallback
    }
  }
}
