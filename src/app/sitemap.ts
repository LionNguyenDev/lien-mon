import { siteConfig } from '@/config/site';
import { LOCATIONS } from '@/data/locations';
import { ROUTES, locationPath } from '@/lib/routes';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [...Object.values(ROUTES), ...LOCATIONS.map((location) => locationPath(location.slug))];

  return paths.map((path) => ({
    url: `${siteConfig.appUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === ROUTES.HOME ? 1 : 0.8,
  }));
}
