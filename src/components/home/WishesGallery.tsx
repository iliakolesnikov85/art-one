import { useState } from 'react'
import { wishesForCategory, type Category, type CategoryId, type Wish } from '../../domain/catalog.ts'
import type { ImageAttachment } from '../../domain/promptDraft.ts'
import { BookmarkIcon, SearchIcon } from '../icons/Icon.tsx'

type WishesGalleryProps = {
  categories: Category[]
  wishes: Wish[][]
  attachedId: string | null
  onUse: (attachment: ImageAttachment) => void
}

function attachmentFrom(wish: Wish): ImageAttachment {
  return {
    id: wish.id,
    name: wish.name,
    url: wish.imageUrl,
    source: 'gallery',
  }
}

export function WishesGallery({ categories, wishes, attachedId, onUse }: WishesGalleryProps) {
  const [category, setCategory] = useState<CategoryId>('for-you')
  const [savedIds, setSavedIds] = useState<string[]>([])
  const columns = wishesForCategory(wishes, category)

  const toggleSaved = (id: string) => {
    setSavedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <section className="wishes" aria-labelledby="wishes-heading">
      <div className="section-heading">
        <h2 id="wishes-heading">Wishes</h2>
      </div>
      <div className="category-bar">
        <div className="category-row" role="group" aria-label="Wishes categories">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === category ? 'is-selected' : ''}
              aria-pressed={item.id === category}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="category-search" type="button" aria-label="Search wishes">
          <SearchIcon />
        </button>
      </div>
      <div className="gallery">
        {columns.map((column, index) => (
          <div className="gallery-column" key={`${category}-${index}`}>
            {column.map((wish) => {
              const selected = attachedId === wish.id
              const saved = savedIds.includes(wish.id)
              return (
                <article
                  key={wish.id}
                  className={selected ? `tile tile-h-${wish.height} is-selected` : `tile tile-h-${wish.height}`}
                >
                  <button
                    className="tile-preview"
                    type="button"
                    aria-label={`Attach ${wish.name}`}
                    onClick={() => onUse(attachmentFrom(wish))}
                  >
                    <img src={wish.imageUrl} alt="" />
                  </button>
                  <button
                    className={saved ? 'save-button is-saved' : 'save-button'}
                    type="button"
                    aria-label={saved ? `Unsave ${wish.name}` : `Save ${wish.name}`}
                    aria-pressed={saved}
                    onClick={() => toggleSaved(wish.id)}
                  >
                    <BookmarkIcon />
                  </button>
                  <div className="tile-caption">
                    <span>{wish.name}</span>
                    <button type="button" onClick={() => onUse(attachmentFrom(wish))}>
                      Use
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
