export const COLLECTIONS = {
  tshirts:     { id: '695894180215', title: 'T-shirts',    slug: 't-shirts' },
  shorts:      { id: '695894049143', title: 'Shorts',      slug: 'shorts' },
  accessoires: { id: '695894081911', title: 'Accessoires', slug: 'accessoires' },
} as const;

export type CollectionKey = keyof typeof COLLECTIONS;
export const COLLECTIONS_LIST = Object.values(COLLECTIONS);
