/**
 * Resolves static asset paths taking into account base path (e.g. /portfolio/ on GitHub Pages)
 */
export const resolveAssetUrl = (url: string | undefined): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url;
  }
  if (url.startsWith('/')) {
    const base = import.meta.env.BASE_URL || '/';
    return `${base.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
  }
  return url;
};
