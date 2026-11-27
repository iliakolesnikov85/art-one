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

export type Wish = {
  id: string
  name: string
  imageUrl: string
  height: 280 | 320 | 406
  category: Exclude<CategoryId, 'for-you'>
}

export type Category = {
  id: CategoryId
  label: string
}

export type HomeCatalog = {
  ideas: Idea[]
  categories: Category[]
  wishes: Wish[][]
}

export function wishesForCategory(wishes: Wish[][], category: CategoryId): Wish[][] {
  if (category === 'for-you') return wishes
  const tiles = wishes.flat().filter((wish) => wish.category === category)
  return tiles.length > 0 ? [tiles] : []
}
