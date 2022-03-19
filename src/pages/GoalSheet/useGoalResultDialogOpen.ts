import { useState, useCallback } from 'react';

export const useGoalResultDialogOpen = (initialValue?: false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue ?? false);

  return {
    isOpen,
    open: useCallback(() => setIsOpen(true), []),
    close: useCallback(() => setIsOpen(false), []),
  };
};


