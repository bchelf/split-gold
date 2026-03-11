export function withBase(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
