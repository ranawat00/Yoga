import { lazy } from 'react';

/**
 * Enhanced lazy import with automatic retry on chunk loading failure.
 * Fixes ChunkLoadError when a new version of the app is deployed or dev server restarts.
 */
export function lazyRetry(componentImport, chunkName = '') {
  return lazy(async () => {
    const key = `yho_retry_${chunkName || 'chunk'}`;
    const hasAlreadyRefreshed = JSON.parse(
      window.sessionStorage.getItem(key) || 'false'
    );

    try {
      return await componentImport();
    } catch (error) {
      const isChunkError =
        error?.name === 'ChunkLoadError' ||
        error?.message?.includes('Loading chunk') ||
        error?.message?.includes('Failed to fetch dynamically imported module');

      if (isChunkError && !hasAlreadyRefreshed) {
        window.sessionStorage.setItem(key, 'true');
        window.location.reload();
        return;
      }
      throw error;
    }
  });
}
