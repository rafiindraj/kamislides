import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ISlide } from '../../../core/models/slide.interface';
import { BauhausIconComponent } from '../../../shared/ui/bauhaus-icon/bauhaus-icon.component';

@Component({
  selector: 'app-slide-sorter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BauhausIconComponent],
  template: `
    @if (isOpen()) {
      <div class="sorter-backdrop animate-fade" (click)="closeOnBackdrop($event)">
        <div class="sorter-window animate-slide-up">
          <header class="sorter-header">
            <div class="sorter-title-area">
              <app-bauhaus-icon name="grid" [size]="20"></app-bauhaus-icon>
              <h2>SLIDE SORTER & OVERVIEW</h2>
              <span class="sorter-count">{{ filteredSlides().length }} / {{ slides().length }} SLIDE</span>
            </div>

            <div class="sorter-search-bar">
              <input
                type="text"
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
                placeholder="Cari slide (misal: 'duck', 'prompt', 'fokus')..."
                class="search-input"
                autofocus
              />
              @if (searchQuery()) {
                <button class="clear-search-btn" (click)="searchQuery.set('')">✕</button>
              }
            </div>

            <button class="close-sorter-btn" (click)="close.emit()" title="Tutup (Esc)">
              ✕
            </button>
          </header>

          <div class="sorter-grid-body">
            @for (slide of filteredSlides(); track slide.id) {
              <div
                class="sorter-card"
                [class.is-current]="slide.id === currentIndex()"
                (click)="selectSlide(slide.id)"
              >
                <div class="card-head">
                  <div class="head-left">
                    <span class="slide-num-badge">
                      {{ slide.slideNumber < 10 ? '0' + slide.slideNumber : slide.slideNumber }}
                    </span>
                    <span class="slide-cat">{{ slide.categoryLabel }}</span>
                  </div>
                  @if (slide.id === currentIndex()) {
                    <span class="current-tag">AKTIF</span>
                  }
                </div>

                <div class="card-preview">
                  <div class="preview-stripe" [style.background-color]="getAccentColor(slide.id)"></div>
                  <h3 class="preview-title">{{ slide.title }}</h3>
                  <p class="preview-sub">{{ slide.subtitle }}</p>

                  <div class="preview-meta-row">
                    <span class="preview-layout">{{ slide.layout }}</span>
                    @if (slide.items) {
                      <span class="preview-count">{{ slide.items.length }} elemen</span>
                    }
                  </div>
                </div>
              </div>
            }
          </div>

          <footer class="sorter-footer">
            <span class="footer-hint">Klik slide untuk melompat langsung &bull; Tekan <strong>Esc</strong> atau <strong>S</strong> untuk menutup</span>
          </footer>
        </div>
      </div>
    }
  `,
  styles: [`
    .sorter-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(20, 23, 26, 0.85);
      backdrop-filter: blur(4px);
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .sorter-window {
      width: 100%;
      max-width: 1200px;
      height: 90vh;
      background-color: var(--color-surface);
      border: 3px solid var(--color-border);
      box-shadow: 12px 12px 0px rgba(0, 0, 0, 0.9);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .sorter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 20px;
      background-color: var(--color-surface-subtle);
      border-bottom: 2px solid var(--color-border);
      flex-shrink: 0;
    }

    .sorter-title-area {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .sorter-title-area h2 {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    .sorter-count {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background-color: var(--color-secondary);
      color: #FFFFFF;
      padding: 2px 8px;
    }

    .sorter-search-bar {
      flex: 1;
      max-width: 450px;
      position: relative;
    }

    .search-input {
      width: 100%;
      background-color: var(--color-surface);
      border: 2px solid var(--color-border);
      padding: 8px 12px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      outline: none;
      color: var(--color-text-primary);
    }
    .search-input:focus {
      border-color: var(--color-primary);
    }

    .clear-search-btn {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-neutral-muted);
      font-weight: 700;
    }

    .close-sorter-btn {
      background: var(--color-surface);
      border: 2px solid var(--color-border);
      width: 32px;
      height: 32px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 150ms ease;
    }
    .close-sorter-btn:hover {
      background-color: var(--color-primary);
      color: #FFFFFF;
    }

    .sorter-grid-body {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }

    .sorter-card {
      border: 2px solid var(--color-border);
      background-color: var(--color-surface);
      box-shadow: 4px 4px 0px var(--color-border);
      cursor: pointer;
      transition: all 180ms ease;
      display: flex;
      flex-direction: column;
    }

    .sorter-card:hover {
      transform: translate(-3px, -3px);
      box-shadow: 7px 7px 0px var(--color-border);
      border-color: var(--color-primary);
    }

    .sorter-card.is-current {
      border: 3px solid var(--color-primary);
      box-shadow: 6px 6px 0px var(--color-primary);
    }

    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      background-color: var(--color-surface-subtle);
      border-bottom: 1.5px solid var(--color-border);
    }

    .head-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .slide-num-badge {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .slide-cat {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-neutral-muted);
      text-transform: uppercase;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .current-tag {
      background-color: var(--color-primary);
      color: #FFFFFF;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      padding: 1px 6px;
    }

    .card-preview {
      padding: 12px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .preview-stripe {
      height: 4px;
      width: 24px;
      margin-bottom: 8px;
    }

    .preview-title {
      font-size: 0.95rem;
      font-weight: 700;
      line-height: 1.25;
      margin-bottom: 4px;
    }

    .preview-sub {
      font-size: 0.75rem;
      color: var(--color-text-secondary);
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 10px;
    }

    .preview-meta-row {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-neutral-muted);
      border-top: 1px dashed var(--color-border-subtle);
      padding-top: 6px;
    }

    .sorter-footer {
      padding: 10px 20px;
      background-color: var(--color-surface-subtle);
      border-top: 2px solid var(--color-border);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-neutral-muted);
      text-align: center;
      flex-shrink: 0;
    }
  `]
})
export class SlideSorterModalComponent {
  readonly slides = input.required<readonly ISlide[]>();
  readonly currentIndex = input.required<number>();
  readonly isOpen = input<boolean>(false);

  readonly slideSelected = output<number>();
  readonly close = output<void>();

  readonly searchQuery = signal<string>('');

  readonly filteredSlides = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const list = this.slides();
    if (!q) return list;

    return list.filter(s =>
      s.title.toLowerCase().includes(q) ||
      (s.subtitle && s.subtitle.toLowerCase().includes(q)) ||
      s.categoryLabel.toLowerCase().includes(q) ||
      (s.items && s.items.some(i => i.title.toLowerCase().includes(q) || (i.description && i.description.toLowerCase().includes(q))))
    );
  });

  protected getAccentColor(id: number): string {
    const colors = ['#E63946', '#1D3557', '#F4D35E'];
    return colors[id % colors.length];
  }

  protected selectSlide(id: number): void {
    this.slideSelected.emit(id);
    this.close.emit();
  }

  protected closeOnBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
