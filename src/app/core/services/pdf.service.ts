import { Injectable, ElementRef } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { LoadingService } from './loading.service';
import { API_ENDPOINTS } from '../constants/endpoint.constant';
import { PRINT_OPTIMIZER_CSS } from '../constants/web.constant';
import { PdfPayload } from '../models/pdf-payload.model';

/**
 * Service responsible for presentation PDF generation, export, and download.
 *
 * Implements the architecture from kamitechupdate:
 * - CSS extraction from active document stylesheets
 * - HTML sanitization (stripping Angular internal attributes)
 * - Image conversion to base64 for reliable rendering
 * - Remote export via BaseApiService with seamless fallback to browser print
 * - Print optimization enforcing 16:9 widescreen layout & zero browser headers/footers
 */
@Injectable({ providedIn: 'root' })
export class PdfService {
  constructor(
    private readonly baseApi: BaseApiService,
    private readonly loading: LoadingService
  ) {}

  /**
   * Extracts the active CSS from all loaded stylesheets in the document.
   * Skips cross-origin stylesheets that block CSSRules access.
   */
  private extractActiveCSS(): string {
    let cssString = '';
    for (const stylesheet of Array.from(document.styleSheets)) {
      try {
        if (stylesheet.cssRules) {
          for (const rule of Array.from(stylesheet.cssRules)) {
            cssString += rule.cssText + '\n';
          }
        }
      } catch {
        console.warn('Skipped a cross-origin stylesheet');
      }
    }
    // Strip Angular emulation attributes so rules match the sanitized HTML in external renderers
    return cssString
      .replace(/\[_ngcontent-[a-zA-Z0-9\-_]+\]/g, '')
      .replace(/\[_nghost-[a-zA-Z0-9\-_]+\]/g, '');
  }

  /**
   * Sanitizes Angular-generated HTML by removing dev-only attributes
   * that bloat the payload (ng-reflect-*, _ng*).
   */
  private sanitizeHtml(rawHtml: string): string {
    return rawHtml
      .replace(/ ng-reflect-[a-zA-Z0-9\-]+="[^"]*"/g, '')
      .replace(/ _ng[a-zA-Z0-9\-]+=""/g, '');
  }

  /**
   * Generates a PDF from the given content element by:
   * 1. Extracting active CSS from the document
   * 2. Cloning the element and stripping any non-printable artifacts
   * 3. Converting images to Base64 to ensure standalone rendering
   * 4. Sanitizing the cleaned innerHTML
   * 5. POSTing to the PDF export endpoint via BaseApiService
   * 6. Redirecting to the download URL on success
   * 7. Falling back to native browser print (styled in 16:9 without headers/footers) on failure
   *
   * @param contentElement - The ElementRef wrapping the printable content (#pdfContent)
   */
  async generateAndDownload(contentElement: ElementRef<HTMLElement>): Promise<void> {
    this.loading.show();

    try {
      const activeCss = this.extractActiveCSS();
      const clone = contentElement.nativeElement.cloneNode(true) as HTMLElement;

      // Remove any interactive UI elements or exclusion markers
      clone.querySelectorAll('.page-excluded, .page-toggle-btn, .page-excluded-overlay').forEach(el => el.remove());

      // Ensure the cloned container is visible in extracted payload
      clone.style.display = 'block';

      // Convert ALL images to Base64 to ensure the backend renderer doesn't skip them
      const images = Array.from(clone.querySelectorAll('img'));
      await Promise.all(
        images.map(async (img) => {
          if (!img.src || img.src.startsWith('data:')) return;
          try {
            const response = await fetch(img.src);
            const blob = await response.blob();

            const base64 = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });

            img.setAttribute('src', base64);
          } catch (err) {
            console.warn('Could not convert image to base64, falling back to absolute URL:', img.src, err);
            img.setAttribute('src', img.src);
          }
        })
      );

      let rawHtml = clone.innerHTML || '';
      rawHtml = this.sanitizeHtml(rawHtml);

      const finalCss = activeCss + '\n' + PRINT_OPTIMIZER_CSS;

      const payload: PdfPayload = {
        css: finalCss,
        html: rawHtml,
      };

      this.baseApi.post<{ downloadUrl: string }>(API_ENDPOINTS.pdf.export, payload).subscribe({
        next: (res) => {
          this.loading.hide();
          window.location.href = res.downloadUrl;
        },
        error: (err) => {
          this.loading.hide();
          console.warn('Backend PDF generation failed or not running. Falling back to native browser print.', err);
          setTimeout(() => window.print(), 100);
        },
      });
    } catch (e) {
      this.loading.hide();
      console.error('Error preparing PDF payload', e);
      setTimeout(() => window.print(), 100);
    }
  }
}
