export type CategoryId =
  | 'for-you'
  | 'food'
  | 'jewelry'
  | 'bags'
  | 'clothing'
  | 'footwear'
  | 'accessories'
  | 'beauty'
  | 'text'
  | 'logos'
  | 'ghost-mannequin'
  | 'sports'
  | 'interior'
  | 'electronics'

export type Idea = {
  id: string
  title: string
  subtitle: string
  prompt: string
  imageUrl: string
}

export type GalleryTile = {
  id: string
  imageUrl: string
  label: string
  height: 280 | 320 | 406
  category: Exclude<CategoryId, 'for-you'>
}

export type Category = {
  id: CategoryId
  label: string
}

export const categories: Category[] = [
  { id: 'for-you', label: 'For you' },
  { id: 'food', label: 'Food' },
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'bags', label: 'Bags' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'footwear', label: 'Footwear' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'text', label: 'Text' },
  { id: 'logos', label: 'Logos' },
  { id: 'ghost-mannequin', label: 'Ghost Mannequin' },
  { id: 'sports', label: 'Sports' },
  { id: 'interior', label: 'Interior' },
  { id: 'electronics', label: 'Electronics' },
]

export const ideas: Idea[] = [
  {
    id: 'product-profile',
    title: 'Product Profile',
    subtitle: 'Create consistent brand content',
    prompt: 'Create consistent brand content for this product.',
    imageUrl: '/media/image-00.jpg',
  },
  {
    id: 'studio-shoot',
    title: 'Studio Shoot',
    subtitle: 'Full campaign photoshoot',
    prompt: 'Create a full campaign studio photoshoot.',
    imageUrl: '/media/image-01.jpg',
  },
  {
    id: 'smart-retouch',
    title: 'Smart Retouch',
    subtitle: 'Fix product imperfections',
    prompt: 'Retouch the product and fix visible imperfections.',
    imageUrl: '/media/image-02.jpg',
  },
  {
    id: 'edit-background',
    title: 'Edit Background',
    subtitle: 'Set a new scene',
    prompt: 'Edit the background and set a new scene.',
    imageUrl: '/media/image-03.jpg',
  },
]

const styleName = 'Style Name'

export const galleryColumns: GalleryTile[][] = [
  [
    { id: 'tile-1', imageUrl: '/media/image-04.jpg', label: styleName, height: 406, category: 'food' },
    { id: 'tile-2', imageUrl: '/media/image-05.jpg', label: styleName, height: 320, category: 'jewelry' },
    { id: 'tile-3', imageUrl: '/media/image-06.jpg', label: styleName, height: 406, category: 'bags' },
  ],
  [
    { id: 'tile-4', imageUrl: '/media/image-07.jpg', label: styleName, height: 280, category: 'clothing' },
    { id: 'tile-5', imageUrl: '/media/image-08.jpg', label: styleName, height: 406, category: 'footwear' },
    { id: 'tile-6', imageUrl: '/media/image-09.jpg', label: styleName, height: 320, category: 'accessories' },
    { id: 'tile-7', imageUrl: '/media/image-09.jpg', label: styleName, height: 320, category: 'beauty' },
  ],
  [
    { id: 'tile-8', imageUrl: '/media/image-10.jpg', label: styleName, height: 406, category: 'text' },
    { id: 'tile-9', imageUrl: '/media/image-11.jpg', label: styleName, height: 320, category: 'logos' },
    { id: 'tile-10', imageUrl: '/media/image-12.jpg', label: styleName, height: 406, category: 'ghost-mannequin' },
  ],
  [
    { id: 'tile-11', imageUrl: '/media/image-13.jpg', label: styleName, height: 280, category: 'sports' },
    { id: 'tile-12', imageUrl: '/media/image-14.jpg', label: styleName, height: 406, category: 'interior' },
    { id: 'tile-13', imageUrl: '/media/image-15.jpg', label: styleName, height: 406, category: 'electronics' },
    { id: 'tile-14', imageUrl: '/media/image-14.jpg', label: styleName, height: 406, category: 'food' },
  ],
  [
    { id: 'tile-15', imageUrl: '/media/image-16.jpg', label: styleName, height: 406, category: 'jewelry' },
    { id: 'tile-16', imageUrl: '/media/image-17.jpg', label: styleName, height: 320, category: 'clothing' },
    { id: 'tile-17', imageUrl: '/media/image-18.jpg', label: styleName, height: 406, category: 'bags' },
  ],
]

export function tilesForCategory(category: CategoryId): GalleryTile[][] {
  if (category === 'for-you') return galleryColumns
  const tiles = galleryColumns.flat().filter((tile) => tile.category === category)
  return tiles.length > 0 ? [tiles] : []
}
