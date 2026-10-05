import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BauhausIconComponent } from '../../../shared/ui/bauhaus-icon/bauhaus-icon.component';

@Component({
  selector: 'app-shortcuts-modal',
  standalone: true,
  imports: [CommonModule, BauhausIconComponent],
  template: `
    @if (isOpen()) {
      <div class="modal-backdrop animate-fade" (click)="closeOnBackdrop($event)">
        <div class="modal-box animate-slide-up">
          <header class="modal-header">
            <div class="header-title">
              <app-bauhaus-icon name="help-circle" [size]="20"></app-bauhaus-icon>
              <h2>PINTASAN KEYBOARD (POWERPOINT COMPATIBLE)</h2>
            </div>
            <button class="modal-close-btn" (click)="close.emit()">✕</button>
          </header>

          <div class="modal-content">
            <div class="shortcuts-grid">
              <div class="shortcut-item">
                <span class="key-combo"><kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PgDn</kbd></span>
                <span class="key-desc">Slide Berikutnya</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>←</kbd> / <kbd>Backspace</kbd> / <kbd>PgUp</kbd></span>
                <span class="key-desc">Slide Sebelumnya</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>Home</kbd> / <kbd>End</kbd></span>
                <span class="key-desc">Slide Pertama / Terakhir</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>F</kbd></span>
                <span class="key-desc">Layar Penuh (Fullscreen)</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>S</kbd></span>
                <span class="key-desc">Buka / Tutup Slide Sorter Grid</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>B</kbd></span>
                <span class="key-desc">Buka / Tutup Sidebar Thumbnail</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>N</kbd></span>
                <span class="key-desc">Buka / Tutup Catatan Pembicara</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>P</kbd></span>
                <span class="key-desc">Putar Otomatis (Slideshow Auto-Play)</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>T</kbd></span>
                <span class="key-desc">Ganti Tema (Bauhaus Terang / Gelap)</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>M</kbd></span>
                <span class="key-desc">Bisukan / Bunyikan Efek Suara</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>?</kbd></span>
                <span class="key-desc">Buka Panduan Pintasan Ini</span>
              </div>
              <div class="shortcut-item">
                <span class="key-combo"><kbd>Esc</kbd></span>
                <span class="key-desc">Tutup Modal / Sorter / Notes</span>
              </div>
            </div>
          </div>

          <footer class="modal-footer">
            <span class="footer-note">Didesain dengan Prinsip Bauhaus & Arsitektur OOP SOLID untuk Kerapihan Kode</span>
          </footer>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(20, 23, 26, 0.85);
      backdrop-filter: blur(4px);
      z-index: 210;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .modal-box {
      width: 100%;
      max-width: 680px;
      background-color: var(--color-surface);
      border: 3px solid var(--color-border);
      box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.9);
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 18px;
      background-color: var(--color-surface-subtle);
      border-bottom: 2px solid var(--color-border);
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header-title h2 {
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    .modal-close-btn {
      background: none;
      border: 1px solid var(--color-border);
      width: 26px;
      height: 26px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-close-btn:hover {
      background-color: var(--color-primary);
      color: #FFFFFF;
    }

    .modal-content {
      padding: 18px;
    }

    .shortcuts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .shortcut-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border: 1px solid var(--color-border);
      background-color: var(--color-surface-subtle);
    }

    .key-combo {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    kbd {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      background-color: var(--color-surface);
      border: 1.5px solid var(--color-border);
      padding: 2px 6px;
      box-shadow: 1.5px 1.5px 0px var(--color-border);
    }

    .key-desc {
      font-size: 0.8rem;
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    .modal-footer {
      padding: 10px 18px;
      background-color: var(--color-surface-subtle);
      border-top: 1.5px solid var(--color-border);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--color-neutral-muted);
      text-align: center;
    }
  `]
})
export class ShortcutsModalComponent {
  readonly isOpen = input<boolean>(false);
  readonly close = output<void>();

  protected closeOnBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
