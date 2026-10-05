import { Component, input, output, ElementRef, viewChildren, effect, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ISlide } from '../../../core/models/slide.interface';
import { BauhausIconComponent } from '../../../shared/ui/bauhaus-icon/bauhaus-icon.component';

@Component({
  selector: 'app-sidebar-thumbnails',
  standalone: true,
  imports: [CommonModule, BauhausIconComponent],
  template: `
    <aside class="sidebar-filmstrip" [class.collapsed]="!isOpen()">
      <div class="sidebar-header">
        <div class="sidebar-title-group">
          <app-bauhaus-icon name="sidebar" [size]="16"></app-bauhaus-icon>
          <span class="sidebar-title">SLIDE DECK</span>
        </div>
        <button class="toggle-btn" (click)="toggleClicked.emit()" title="Tutup / Buka Sidebar (B)">
          <app-bauhaus-icon [name]="isOpen() ? 'chevron-left' : 'chevron-right'" [size]="16"></app-bauhaus-icon>
        </button>
      </div>

      @if (isOpen()) {
        <div class="thumbnails-scroll-container">
          @for (item of slides(); track item.id; let idx = $index) {
            <div
              #thumbnailItem
              class="thumbnail-card"
              [class.active]="idx === activeIndex()"
              (click)="slideSelected.emit(idx)"
            >
              <div class="thumb-header">
                <span class="thumb-number">{{ idx < 10 ? '0' + idx : idx }}</span>
                <span class="thumb-category">{{ item.categoryLabel }}</span>
              </div>

              <!-- Mini slide wireframe preview -->
              <div class="thumb-preview-box">
                <div class="wireframe-accent" [style.background-color]="getAccentColor(idx)"></div>
                <div class="wireframe-title">{{ item.title }}</div>
                <div class="wireframe-bar"></div>
                <div class="wireframe-bar short"></div>
              </div>

              <div class="thumb-footer">
                <span class="thumb-type">{{ item.layout }}</span>
                @if (idx === activeIndex()) {
                  <span class="thumb-current-indicator">AKTIF</span>
                }
              </div>
            </div>
          }
        </div>
      }
    </aside>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .sidebar-filmstrip {
      width: 250px;
      height: 100%;
      background-color: var(--color-surface-subtle);
      border-right: 2px solid var(--color-border);
      display: flex;
      flex-direction: column;
      transition: width 200ms cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      z-index: 20;
    }

    .sidebar-filmstrip.collapsed {
      width: 44px;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-bottom: 2px solid var(--color-border);
      background-color: var(--color-surface);
      flex-shrink: 0;
    }

    .sidebar-title-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sidebar-title {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--color-text-primary);
    }

    .toggle-btn {
      background: transparent;
      border: 1px solid var(--color-border);
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--color-text-primary);
      transition: background-color 150ms ease;
    }
    .toggle-btn:hover {
      background-color: var(--color-primary);
      color: #FFFFFF;
    }

    .thumbnails-scroll-container {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .thumbnail-card {
      border: 2px solid var(--color-border);
      background-color: var(--color-surface);
      padding: 8px;
      cursor: pointer;
      box-shadow: 2px 2px 0px var(--color-border);
      transition: all 150ms ease;
      position: relative;
    }

    .thumbnail-card:hover {
      transform: translateX(2px);
      box-shadow: 4px 4px 0px var(--color-border);
    }

    .thumbnail-card.active {
      border-color: var(--color-primary);
      border-width: 2.5px;
      background-color: var(--color-surface);
      box-shadow: 4px 4px 0px var(--color-primary);
    }

    .thumb-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .thumb-number {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .thumb-category {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-neutral-muted);
      text-transform: uppercase;
      max-width: 140px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .thumb-preview-box {
      background-color: var(--color-surface-subtle);
      border: 1px solid var(--color-border-subtle);
      padding: 8px 10px;
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    .wireframe-accent {
      width: 18px;
      height: 4px;
    }

    .wireframe-title {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--color-text-primary);
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .wireframe-bar {
      height: 3px;
      background-color: var(--color-border-subtle);
      width: 80%;
    }
    .wireframe-bar.short {
      width: 45%;
    }

    .thumb-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 6px;
      font-family: var(--font-mono);
      font-size: 0.65rem;
    }

    .thumb-type {
      color: var(--color-neutral-muted);
    }

    .thumb-current-indicator {
      background-color: var(--color-primary);
      color: #FFFFFF;
      padding: 1px 4px;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
  `]
})
export class SidebarThumbnailsComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly slides = input.required<readonly ISlide[]>();
  readonly activeIndex = input.required<number>();
  readonly isOpen = input<boolean>(true);

  readonly slideSelected = output<number>();
  readonly toggleClicked = output<void>();

  private readonly thumbnailItems = viewChildren<ElementRef<HTMLElement>>('thumbnailItem');

  constructor() {
    effect(() => {
      const idx = this.activeIndex();
      const items = this.thumbnailItems();
      if (isPlatformBrowser(this.platformId) && items && items[idx]) {
        items[idx].nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  protected getAccentColor(idx: number): string {
    const colors = ['#E63946', '#1D3557', '#F4D35E'];
    return colors[idx % colors.length];
  }
}
