import { useEffect } from 'react';

/**
 * Warns the user before leaving the page when there's unsaved progress.
 * Hooks into `beforeunload` event to show native browser confirmation dialog.
 * 
 * @param shouldWarn - Whether the warning should be active (e.g., user has started but not finished)
 */
export function useLeaveWarning(shouldWarn: boolean): void {
  useEffect(() => {
    if (!shouldWarn) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Modern browsers ignore custom messages but still show a generic dialog
      e.returnValue = 'Bạn đang làm bài — rời trang sẽ mất tiến trình!';
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [shouldWarn]);
}
