import { Content } from './types';

export function transformer(c: Content, data: string): string {
  let df = '---\n';
  Object.keys(c.meta).forEach((h) => (df += `${h}: ${c.meta[h]}\n`));
  df += '---\n\n';

  if (!!c.header) {
    df += c.header + '\n\n';
  }

  return df + data;
}
