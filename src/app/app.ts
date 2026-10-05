import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideManagerService } from './core/services/slide-manager.service';
import { PresentationTimerService } from './core/services/presentation-timer.service';
import { ThemeService } from './core/services/theme.service';
import { KeyboardNavigationService } from './core/services/keyboard-navigation.service';
import { AudioFeedbackService } from './core/services/audio-feedback.service';
import { PdfService } from './core/services/pdf.service';
import { LoadingService } from './core/services/loading.service';

import { SlideCanvasComponent } from './features/presentation/slide-canvas/slide-canvas.component';
import { SidebarThumbnailsComponent } from './features/presentation/sidebar-thumbnails/sidebar-thumbnails.component';
import { ControlsBarComponent } from './features/presentation/controls-bar/controls-bar.component';
import { PresenterNotesComponent } from './features/presentation/presenter-notes/presenter-notes.component';
import { SlideSorterModalComponent } from './features/presentation/slide-sorter-modal/slide-sorter-modal.component';
import { ShortcutsModalComponent } from './features/presentation/shortcuts-modal/shortcuts-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SlideCanvasComponent,
    SidebarThumbnailsComponent,
    ControlsBarComponent,
    PresenterNotesComponent,
    SlideSorterModalComponent,
    ShortcutsModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // Dependency Injection following SOLID principles (Inversion of Control)
  protected readonly slideManager = inject(SlideManagerService);
  protected readonly timerService = inject(PresentationTimerService);
  protected readonly themeService = inject(ThemeService);
  protected readonly audioService = inject(AudioFeedbackService);
  private readonly keyboardNav = inject(KeyboardNavigationService);
  private readonly pdfService = inject(PdfService);
  private readonly loadingService = inject(LoadingService);

  readonly isGeneratingPdf = this.loadingService.isLoading;
  readonly pdfContent = viewChild<ElementRef<HTMLElement>>('pdfContent');

  ngOnInit(): void {
    // Initialize PowerPoint-style global keyboard navigation listeners
    this.keyboardNav.init();
    // Auto-start presentation timer on load
    this.timerService.start();
  }

  protected get upcomingSlide() {
    const list = this.slideManager.slides();
    const nextIdx = this.slideManager.currentIndex() + 1;
    return nextIdx < list.length ? list[nextIdx] : null;
  }

  /**
   * Generates and downloads the full presentation as a 16:9 PDF.
   * Leverages PdfService (SRP) from the Kamitech update architecture.
   */
  downloadPDF(): void {
    const element = this.pdfContent();
    if (element) {
      this.pdfService.generateAndDownload(element);
    }
  }
}

