import { MetadataRoute } from 'next'
import { SHOP_ENABLED } from './lib/flags'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://firstteam-group.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://firstteam-group.com/contenus',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://firstteam-group.com/qui-nous-sommes',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://firstteam-group.com/partenaires',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...(SHOP_ENABLED ? [{
      url: 'https://firstteam-group.com/shop',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }] : []),
  ]
}
