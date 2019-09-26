import ReactGA, { EventArgs } from 'react-ga';

type Category = 'Form' | 'CTA' | 'Search' | 'User';

interface EventOptions {
  category: Category;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  transport?: string;
}

export function trackEvent(options: EventOptions) {
  ReactGA.event(options);
}
