import { readFileSync } from 'node:fs';
import { describe, expect, it, vi, afterEach } from 'vitest';
import capacitorConfig from '../../capacitor.config';
import { getBeat, listBeats, listCategories, getSitePage } from '@/lib/beats.native';

afterEach(() => vi.unstubAllGlobals());

describe('Android packaging requirements', () => {
  it('uses the requested application name', () => {
    expect(capacitorConfig.appName).toBe('Afrobeat Instrumental');
  });
  it('uses the requested Android package ID', () => {
    expect(capacitorConfig.appId).toBe('com.afrobeatinstrumental.app');
  });
  it('packages dist instead of a remote website', () => {
    expect(capacitorConfig.webDir).toBe('dist');
    expect(capacitorConfig.server?.url).toBeUndefined();
  });
  it('builds production local assets with Vite', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    expect(pkg.scripts.build).toBe('vite build --config vite.android.config.ts');
  });
  it('uses the existing WordPress website for all Android content calls', async () => {
    const urls: URL[] = [];
    vi.stubGlobal('fetch', vi.fn(async (url: URL) => {
      urls.push(url);
      return new Response('[]', { headers: { 'Content-Type': 'application/json' } });
    }));
    await listBeats({ data: { search: 'guitar', page: 2 } });
    await getBeat({ data: { slug: 'sample-beat' } });
    await listCategories();
    await getSitePage({ data: { slug: 'dmca' } });
    expect(urls).toHaveLength(4);
    for (const url of urls) {
      expect(url.origin).toBe('https://afrobeatinstrumental.com');
      expect(url.pathname.startsWith('/wp-json/wp/v2/')).toBe(true);
    }
    expect(urls[0]?.searchParams.get('search')).toBe('guitar');
    expect(urls[0]?.searchParams.get('page')).toBe('2');
  });
});