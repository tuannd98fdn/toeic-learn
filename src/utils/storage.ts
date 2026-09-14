/**
 * A type-safe wrapper around localStorage that handles JSON serialization
 * and is safe to use in Server-Side Rendering (SSR) environments like Next.js.
 */

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      if (item === null || item === undefined) {
        return defaultValue;
      }

      try {
        const parsed = JSON.parse(item);
        if (typeof defaultValue === 'string' && typeof parsed === 'number') {
          return String(parsed) as unknown as T;
        }
        return parsed as T;
      } catch {
        // If caller expects an object or array (and defaultValue is not null),
        // but JSON.parse failed, do not return raw string.
        if (defaultValue !== null && typeof defaultValue === 'object') {
          return defaultValue;
        }

        // If the item clearly intended to be a JSON object/array but is broken
        const trimmed = typeof item === 'string' ? item.trim() : '';
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
          return defaultValue;
        }

        // Handle boolean expected values
        if (typeof defaultValue === 'boolean') {
          return (item === 'true' || item === '1') as unknown as T;
        }

        // Handle number expected values
        if (typeof defaultValue === 'number') {
          const num = Number(item);
          return (isNaN(num) ? defaultValue : num) as unknown as T;
        }

        // Plain raw string (e.g. '2026-10-15', '750+', 'intermediate')
        return item as unknown as T;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('app-storage-update', { detail: { key, value } }));
      }, 0);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.removeItem(key);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('app-storage-update', { detail: { key, value: null } }));
      }, 0);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },
  
  clear: (): void => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.clear();
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('app-storage-update', { detail: { key: '*', value: null } }));
      }, 0);
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
    }
  }
};
