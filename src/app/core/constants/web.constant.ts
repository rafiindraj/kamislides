/**
 * Print & PDF Optimizer CSS.
 * Applied during PDF extraction and printing to guarantee clean 16:9 slides,
 * zero margins (removing browser print header/footer), and accurate colors.
 */
export const PRINT_OPTIMIZER_CSS = `
  @page {
    size: 16in 9in;
    margin: 0;
  }

  * {
    box-shadow: none !important;
    text-shadow: none !important;
    filter: none !important;
    backdrop-filter: none !important;
    color-adjust: exact !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  html, body {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #FFFFFF !important;
    color: #1A1A1A !important;
    overflow: visible !important;
  }

  /* Remove any application chrome, navigation, headers, footers & buttons */
  .presentation-app-container,
  .workspace-area,
  app-sidebar-thumbnails,
  app-controls-bar,
  app-presenter-notes,
  .fullscreen-presentation-nav,
  app-slide-sorter-modal,
  app-shortcuts-modal,
  .stopwatch-badge,
  button {
    display: none !important;
  }

  /* Show ONLY the slide deck in 16:9 */
  .pdf-print-deck {
    display: block !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .pdf-print-page {
    width: 16in !important;
    height: 9in !important;
    max-width: 16in !important;
    max-height: 9in !important;
    margin: 0 !important;
    padding: 0 !important;
    page-break-after: always !important;
    break-after: page !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: #FFFFFF !important;
    overflow: hidden !important;
  }

  .pdf-print-page app-slide-canvas,
  .pdf-print-page .slide-stage,
  .pdf-print-page .canvas-aspect-wrapper {
    width: 16in !important;
    height: 9in !important;
    max-width: none !important;
    max-height: none !important;
    aspect-ratio: 16 / 9 !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .pdf-print-page .canvas-inner {
    padding: 1.4rem 2.4rem 1rem !important;
    overflow: hidden !important;
    width: 100% !important;
    height: 100% !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
  }

  .pdf-print-page .slide-header {
    flex-shrink: 0 !important;
    margin-bottom: 0.6rem !important;
    padding-bottom: 0.5rem !important;
    border-bottom: 2px solid var(--color-border) !important;
  }

  .pdf-print-page .slide-content-area {
    flex: 1 !important;
    min-height: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    overflow: hidden !important;
  }

  .pdf-print-page .slide-footer {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    flex-shrink: 0 !important;
    margin-top: auto !important;
    padding-top: 0.5rem !important;
    border-top: 1.5px solid var(--color-border-subtle) !important;
    font-family: var(--font-mono) !important;
    font-size: 0.85rem !important;
  }

  .pdf-print-page .slide-heading {
    font-size: 1.75rem !important;
    font-weight: 700 !important;
    line-height: 1.15 !important;
    margin-bottom: 0.2rem !important;
  }

  .pdf-print-page .slide-subheading {
    font-size: 0.95rem !important;
    line-height: 1.35 !important;
    margin-bottom: 0.5rem !important;
    color: var(--color-text-secondary) !important;
  }

  /* Slide 01: Split Hero Optimizations */
  .pdf-print-page .layout-split-hero {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 1.5rem !important;
    height: 100% !important;
    align-items: center !important;
  }

  .pdf-print-page .hero-left-col {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
  }

  .pdf-print-page .takeaway-banner {
    margin-top: 0.5rem !important;
  }

  .pdf-print-page .takeaway-content {
    padding: 0.6rem 0.9rem !important;
  }

  .pdf-print-page .takeaway-tag {
    font-size: 0.7rem !important;
  }

  .pdf-print-page .takeaway-text {
    font-size: 0.86rem !important;
    line-height: 1.35 !important;
    margin-top: 2px !important;
  }

  .pdf-print-page .items-vertical-list {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.38rem !important;
    justify-content: center !important;
  }

  .pdf-print-page .items-vertical-list .bauhaus-card {
    box-shadow: 2px 2px 0px var(--color-border) !important;
  }

  .pdf-print-page .items-vertical-list .card-content {
    padding: 0.45rem 0.8rem !important;
  }

  .pdf-print-page .card-item-header {
    margin-bottom: 0.15rem !important;
  }

  .pdf-print-page .card-item-title {
    font-size: 0.92rem !important;
    margin-bottom: 2px !important;
  }

  .pdf-print-page .card-item-desc {
    font-size: 0.75rem !important;
    line-height: 1.25 !important;
  }

  /* Slide 02: Checklist Diagnostic & Quote Banner */
  .pdf-print-page .layout-checklist {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    justify-content: space-between !important;
  }

  .pdf-print-page .checklist-header-area {
    margin-bottom: 0.3rem !important;
  }

  .pdf-print-page .checklist-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.35rem !important;
    margin-bottom: 0.35rem !important;
  }

  .pdf-print-page .checklist-card {
    padding: 5px 10px !important;
    gap: 10px !important;
    box-shadow: 2px 2px 0px var(--color-border) !important;
  }

  .pdf-print-page .check-box-square {
    width: 18px !important;
    height: 18px !important;
    margin-top: 1px !important;
  }

  .pdf-print-page .check-meta {
    gap: 6px !important;
    margin-bottom: 1px !important;
  }

  .pdf-print-page .check-title {
    font-size: 0.86rem !important;
    margin-bottom: 1px !important;
  }

  .pdf-print-page .check-desc {
    font-size: 0.73rem !important;
    line-height: 1.22 !important;
  }

  .pdf-print-page .bauhaus-quote-banner {
    display: flex !important;
    align-items: center !important;
    padding: 6px 14px !important;
    gap: 12px !important;
    background-color: var(--color-surface-subtle) !important;
    border: 2px solid var(--color-border) !important;
    box-shadow: 3px 3px 0px var(--color-border) !important;
    margin-top: 0.35rem !important;
    margin-bottom: 0.15rem !important;
  }

  .pdf-print-page .quote-mark {
    font-family: var(--font-display) !important;
    font-size: 2.2rem !important;
    line-height: 1 !important;
    color: var(--color-primary) !important;
    font-weight: 700 !important;
  }

  .pdf-print-page .quote-body {
    flex: 1 !important;
  }

  .pdf-print-page .quote-text {
    font-size: 0.85rem !important;
    font-weight: 600 !important;
    font-style: italic !important;
    line-height: 1.35 !important;
    color: var(--color-text-primary) !important;
  }

  .pdf-print-page .quote-author {
    font-size: 0.72rem !important;
    font-family: var(--font-mono) !important;
    display: block !important;
    margin-top: 2px !important;
    color: var(--color-neutral-muted) !important;
  }

  /* Slide 11: Critical Alert & Quote Box */
  .pdf-print-page .layout-critical-alert {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    justify-content: space-between !important;
  }

  .pdf-print-page .alert-top-hero {
    padding: 5px 12px !important;
    margin-bottom: 0.35rem !important;
    border: 2px solid var(--color-primary) !important;
    box-shadow: 3px 3px 0px var(--color-primary) !important;
  }

  .pdf-print-page .alert-hero-badge {
    font-size: 0.7rem !important;
    gap: 6px !important;
  }

  .pdf-print-page .alert-hero-title {
    font-size: 1.15rem !important;
    margin: 1px 0 !important;
  }

  .pdf-print-page .alert-hero-sub {
    font-size: 0.78rem !important;
    line-height: 1.25 !important;
  }

  .pdf-print-page .alert-signs-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.35rem !important;
    margin-bottom: 0.35rem !important;
  }

  .pdf-print-page .sign-card {
    box-shadow: 2px 2px 0px var(--color-border) !important;
  }

  .pdf-print-page .sign-content {
    padding: 5px 10px !important;
  }

  .pdf-print-page .sign-tag {
    font-size: 0.65rem !important;
  }

  .pdf-print-page .sign-title {
    font-size: 0.83rem !important;
    margin: 1px 0 !important;
  }

  .pdf-print-page .sign-desc {
    font-size: 0.72rem !important;
    line-height: 1.22 !important;
  }

  .pdf-print-page .alert-action-banner {
    margin-bottom: 0.35rem !important;
    box-shadow: 3px 3px 0px var(--color-border) !important;
  }

  .pdf-print-page .banner-body {
    padding: 5px 12px !important;
  }

  .pdf-print-page .banner-title {
    font-size: 0.68rem !important;
  }

  .pdf-print-page .banner-text {
    font-size: 0.76rem !important;
    line-height: 1.3 !important;
    margin-top: 1px !important;
  }

  .pdf-print-page .alert-quote-banner {
    display: flex !important;
    align-items: center !important;
    padding: 5px 12px !important;
    gap: 12px !important;
    background-color: var(--color-surface-subtle) !important;
    border: 2px solid var(--color-border) !important;
    box-shadow: 3px 3px 0px var(--color-border) !important;
    margin-top: 0.25rem !important;
  }
`;

