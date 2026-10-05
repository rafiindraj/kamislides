import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BauhausIconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'chevron-left'
  | 'chevron-right'
  | 'play'
  | 'pause'
  | 'grid'
  | 'maximize'
  | 'minimize'
  | 'moon'
  | 'sun'
  | 'volume-2'
  | 'volume-x'
  | 'clock'
  | 'help-circle'
  | 'check'
  | 'terminal'
  | 'shield'
  | 'shield-alert'
  | 'code'
  | 'layers'
  | 'shuffle'
  | 'trending'
  | 'bug'
  | 'eye'
  | 'wind'
  | 'file-text'
  | 'bell-off'
  | 'activity'
  | 'database'
  | 'alert-triangle'
  | 'history'
  | 'target'
  | 'repeat'
  | 'coffee'
  | 'users'
  | 'lock'
  | 'cpu'
  | 'sidebar'
  | 'book-open'
  | 'sparkles'
  | 'message-square'
  | 'printer'
  | 'copy';

@Component({
  selector: 'app-bauhaus-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="icon-wrapper" [style.width.px]="size()" [style.height.px]="size()">
      <svg
        [attr.width]="size()"
        [attr.height]="size()"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        [attr.stroke-width]="strokeWidth()"
        stroke-linecap="square"
        stroke-linejoin="miter"
        class="bauhaus-svg"
      >
        @switch (name()) {
          @case ('arrow-left') {
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          }
          @case ('arrow-right') {
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          }
          @case ('chevron-left') {
            <polyline points="15 18 9 12 15 6"></polyline>
          }
          @case ('chevron-right') {
            <polyline points="9 18 15 12 9 6"></polyline>
          }
          @case ('play') {
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>
          }
          @case ('pause') {
            <rect x="6" y="4" width="4" height="16" fill="currentColor"></rect>
            <rect x="14" y="4" width="4" height="16" fill="currentColor"></rect>
          }
          @case ('grid') {
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          }
          @case ('maximize') {
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          }
          @case ('minimize') {
            <path d="M4 14h6m0 0v6m0-6L3 21m17-11h-6m0 0V4m0 6l7-7m-7 17v-6m0 0h6m-6 0l7 7M3 3l7 7m0 0H4m6 0V4"></path>
          }
          @case ('moon') {
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          }
          @case ('sun') {
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          }
          @case ('volume-2') {
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          }
          @case ('volume-x') {
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          }
          @case ('clock') {
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          }
          @case ('help-circle') {
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          }
          @case ('check') {
            <polyline points="20 6 9 17 4 12"></polyline>
          }
          @case ('terminal') {
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          }
          @case ('shield') {
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          }
          @case ('shield-alert') {
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          }
          @case ('code') {
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          }
          @case ('layers') {
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          }
          @case ('shuffle') {
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="4" y1="20" x2="21" y2="3"></line>
            <polyline points="21 16 21 21 16 21"></polyline>
            <line x1="15" y1="15" x2="21" y2="21"></line>
            <line x1="4" y1="4" x2="9" y2="9"></line>
          }
          @case ('trending') {
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          }
          @case ('bug') {
            <rect x="8" y="9" width="8" height="10" rx="0"></rect>
            <path d="M6 13H2"></path>
            <path d="M22 13h-4"></path>
            <path d="M6 7L3 4"></path>
            <path d="M21 4l-3 3"></path>
            <path d="M6 19l-3 3"></path>
            <path d="M21 22l-3-3"></path>
            <circle cx="12" cy="6" r="3"></circle>
          }
          @case ('eye') {
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          }
          @case ('wind') {
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
          }
          @case ('file-text') {
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          }
          @case ('bell-off') {
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            <path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path>
            <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          }
          @case ('activity') {
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          }
          @case ('database') {
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          }
          @case ('alert-triangle') {
            <polygon points="12 2 22 20 2 20 12 2"></polygon>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          }
          @case ('history') {
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <polyline points="12 7 12 12 15 15"></polyline>
          }
          @case ('target') {
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          }
          @case ('repeat') {
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          }
          @case ('coffee') {
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          }
          @case ('users') {
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          }
          @case ('lock') {
            <rect x="3" y="11" width="18" height="11" rx="0"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          }
          @case ('cpu') {
            <rect x="4" y="4" width="16" height="16" rx="0"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
            <line x1="9" y1="1" x2="9" y2="4"></line>
            <line x1="15" y1="1" x2="15" y2="4"></line>
            <line x1="9" y1="20" x2="9" y2="23"></line>
            <line x1="15" y1="20" x2="15" y2="23"></line>
            <line x1="20" y1="9" x2="23" y2="9"></line>
            <line x1="20" y1="14" x2="23" y2="14"></line>
            <line x1="1" y1="9" x2="4" y2="9"></line>
            <line x1="1" y1="14" x2="4" y2="14"></line>
          }
          @case ('sidebar') {
            <rect x="3" y="3" width="18" height="18" rx="0"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          }
          @case ('sparkles') {
            <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-2.6-6.4l-2.1 2.1m-6.6 6.6l-2.1 2.1m10.8 0l-2.1-2.1M6.7 6.7L4.6 8.8"></path>
          }
          @case ('copy') {
            <rect x="9" y="9" width="13" height="13" rx="0"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          }
          @case ('printer') {
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          }
          @default {
            <circle cx="12" cy="12" r="10"></circle>
          }
        }
      </svg>
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      line-height: 0;
    }
    .icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .bauhaus-svg {
      display: block;
      transition: transform 200ms ease;
    }
  `]
})
export class BauhausIconComponent {
  readonly name = input.required<BauhausIconName | string>();
  readonly size = input<number>(20);
  readonly strokeWidth = input<number>(2);
}
