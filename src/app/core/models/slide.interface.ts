export type SlideCategory =
  | 'intro'
  | 'problem'
  | 'concept'
  | 'technique'
  | 'practical'
  | 'wellness'
  | 'warning'
  | 'conclusion';

export type SlideLayoutType =
  | 'intro'
  | 'split-hero'
  | 'checklist'
  | 'comparison-table'
  | 'technique-overview'
  | 'numbered-steps'
  | 'code-inspection'
  | 'ai-comparison'
  | 'prompt-showcase'
  | 'grid-cards'
  | 'timeline'
  | 'critical-alert'
  | 'summary';

export interface ISlideAction {
  label: string;
  url?: string;
  type?: 'primary' | 'secondary' | 'accent';
  handler?: () => void;
}

export interface ISlideListItem {
  title: string;
  description?: string;
  detail?: string;
  badge?: string;
  icon?: string;
  highlight?: boolean;
}

export interface ICodeSnippet {
  language: string;
  code: string;
  highlightLines?: number[];
  callout?: string;
  explanation?: string;
}

export interface IComparisonRow {
  aspect: string;
  col1: string;
  col2: string;
}

export interface ISlide {
  id: number;
  slideNumber: number; // 0 to 16
  slug: string;
  title: string;
  subtitle?: string;
  category: SlideCategory;
  categoryLabel: string;
  layout: SlideLayoutType;
  presenterInfo?: {
    name: string;
    role: string;
    department: string;
    organization: string;
  };
  keyTakeaway?: string;
  quote?: {
    text: string;
    author?: string;
  };
  items?: ISlideListItem[];
  comparison?: {
    col1Header: string;
    col2Header: string;
    rows: IComparisonRow[];
    conclusion?: string;
  };
  codeSnippet?: ICodeSnippet;
  notes?: string[];
  interactiveType?: 'duck' | 'timer' | 'focus-toggle' | 'prompt-tester' | 'none';
}

export interface ISlideNavigationState {
  currentSlideIndex: number;
  totalSlides: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  progressPercentage: number;
}
