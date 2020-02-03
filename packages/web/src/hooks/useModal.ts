import * as React from 'react';

interface UseModalOptions {
  defaultOpen?: boolean;
}

export function useModal({ defaultOpen = false }: UseModalOptions) {
  const [isOpen, setOpen] = React.useState(defaultOpen);

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    isOpen
  };
}
