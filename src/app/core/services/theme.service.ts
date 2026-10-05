import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'bauhaus-light' | 'bauhaus-dark';

export interface IThemeService {
  currentTheme(): ThemeMode;
  isDark(): boolean;
  toggleTheme(): void;
  setTheme(theme: ThemeMode): void;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements IThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly currentTheme = signal<ThemeMode>('bauhaus-light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('bauhaus_theme') as ThemeMode | null;
      if (savedTheme === 'bauhaus-light' || savedTheme === 'bauhaus-dark') {
        this.currentTheme.set(savedTheme);
      }
    }

    effect(() => {
      const theme = this.currentTheme();
      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('bauhaus_theme', theme);
      }
    });
  }

  isDark(): boolean {
    return this.currentTheme() === 'bauhaus-dark';
  }

  toggleTheme(): void {
    this.currentTheme.update(current => (current === 'bauhaus-light' ? 'bauhaus-dark' : 'bauhaus-light'));
  }

  setTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
  }
}
