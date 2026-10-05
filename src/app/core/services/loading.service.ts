import { Injectable, signal } from '@angular/core';

/**
 * Signal-based service to track loading and generation state.
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingCount = 0;
  private readonly _isLoading = signal<boolean>(false);
  readonly isLoading = this._isLoading.asReadonly();

  show(): void {
    this.loadingCount += 1;
    if (this.loadingCount > 0) this._isLoading.set(true);
  }

  hide(): void {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) this._isLoading.set(false);
  }

  reset(): void {
    this.loadingCount = 0;
    this._isLoading.set(false);
  }
}
