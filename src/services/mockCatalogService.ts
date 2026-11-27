import type { Category, HomeCatalog, Idea, Wish } from '../domain/catalog.ts'
import type { CatalogService } from './catalogService.ts'

function media(file: string) {
  return `${import.meta.env.BASE_URL}media/${file}`
}

const categories: Category[] = [
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

const ideas: Idea[] = [
  {
    id: 'product-profile',
    title: 'Product Profile',
    subtitle: 'Create consistent brand content',
    prompt: 'Create consistent brand content for this product.',
    imageUrl: media('image-00.jpg'),
  },
  {
    id: 'studio-shoot',
    title: 'Studio Shoot',
    subtitle: 'Full campaign photoshoot',
    prompt: 'Create a full campaign studio photoshoot.',
    imageUrl: media('image-01.jpg'),
  },
  {
    id: 'smart-retouch',
    title: 'Smart Retouch',
    subtitle: 'Fix product imperfections',
    prompt: 'Retouch the product and fix visible imperfections.',
    imageUrl: media('image-02.jpg'),
  },
  {
    id: 'edit-background',
    title: 'Edit Background',
    subtitle: 'Set a new scene',
    prompt: 'Edit the background and set a new scene.',
    imageUrl: media('image-03.jpg'),
  },
]

const wishes: Wish[][] = [
  [
    { id: 'tile-1', imageUrl: media('image-04.jpg'), name: 'Dewy Close-Up', height: 406, category: 'food' },
    { id: 'tile-2', imageUrl: media('image-05.jpg'), name: 'Palm Portrait', height: 320, category: 'jewelry' },
    { id: 'tile-3', imageUrl: media('image-06.jpg'), name: 'City Giant', height: 406, category: 'bags' },
  ],
  [
    { id: 'tile-4', imageUrl: media('image-07.jpg'), name: 'Red Tracksuit', height: 280, category: 'clothing' },
    { id: 'tile-5', imageUrl: media('image-08.jpg'), name: 'White Corset', height: 406, category: 'footwear' },
    { id: 'tile-6', imageUrl: media('image-09.jpg'), name: 'Cloud Carousel', height: 320, category: 'accessories' },
    { id: 'tile-7', imageUrl: media('image-09.jpg'), name: 'Carousel Bags', height: 320, category: 'beauty' },
  ],
  [
    { id: 'tile-8', imageUrl: media('image-10.jpg'), name: 'Giant Duffel', height: 406, category: 'text' },
    { id: 'tile-9', imageUrl: media('image-11.jpg'), name: 'Satin Bow', height: 320, category: 'logos' },
    { id: 'tile-10', imageUrl: media('image-12.jpg'), name: 'Hillside Letters', height: 406, category: 'ghost-mannequin' },
  ],
  [
    { id: 'tile-11', imageUrl: media('image-13.jpg'), name: 'Collar Detail', height: 280, category: 'sports' },
    { id: 'tile-12', imageUrl: media('image-14.jpg'), name: 'Lilac Puffer', height: 406, category: 'interior' },
    { id: 'tile-13', imageUrl: media('image-15.jpg'), name: 'Daily Dose', height: 406, category: 'electronics' },
    { id: 'tile-14', imageUrl: media('image-14.jpg'), name: 'Studio Puffer', height: 406, category: 'food' },
  ],
  [
    { id: 'tile-15', imageUrl: media('image-16.jpg'), name: 'Fur Arch', height: 406, category: 'jewelry' },
    { id: 'tile-16', imageUrl: media('image-17.jpg'), name: 'Frozen Sneaker', height: 320, category: 'clothing' },
    { id: 'tile-17', imageUrl: media('image-18.jpg'), name: 'Summer Ride', height: 406, category: 'bags' },
  ],
]

function cloneCatalog(): HomeCatalog {
  return {
    ideas: ideas.map((idea) => ({ ...idea })),
    categories: categories.map((category) => ({ ...category })),
    wishes: wishes.map((column) => column.map((wish) => ({ ...wish }))),
  }
}

export const mockCatalogService: CatalogService = {
  getHomeCatalog() {
    return Promise.resolve(cloneCatalog())
  },
}
