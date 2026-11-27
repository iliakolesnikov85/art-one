import { useState } from 'react'
import { categories, tilesForCategory, type CategoryId, type GalleryTile } from '../../data/catalog.ts'
import type { ImageAttachment } from '../../domain/promptDraft.ts'
import { BookmarkIcon, SearchIcon } from '../icons/Icon.tsx'

type WishesGalleryProps = {
  attachedId: string | null
  onUse: (attachment: ImageAttachment) => void
}

function attachmentFrom(tile: GalleryTile): ImageAttachment {
  return {
    id: tile.id,
    name: tile.label,
    url: tile.imageUrl,
    source: 'gallery',
  }
}

export function WishesGallery({ attachedId, onUse }: WishesGalleryProps) {
  const [category, setCategory] = useState<CategoryId>('for-you')
  const [savedIds, setSavedIds] = useState<string[]>([])
  const columns = tilesForCategory(category)

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
            {column.map((tile) => {
              const selected = attachedId === tile.id
              const saved = savedIds.includes(tile.id)
              return (
                <article
                  key={tile.id}
                  className={selected ? `tile tile-h-${tile.height} is-selected` : `tile tile-h-${tile.height}`}
                >
                  <img src={tile.imageUrl} alt="" />
                  <button
                    className={saved ? 'save-button is-saved' : 'save-button'}
                    type="button"
                    aria-label={saved ? `Unsave ${tile.label}` : `Save ${tile.label}`}
                    aria-pressed={saved}
                    onClick={() => toggleSaved(tile.id)}
                  >
                    <BookmarkIcon />
                  </button>
                  <div className="tile-caption">
                    <span>{tile.label}</span>
                    <button type="button" onClick={() => onUse(attachmentFrom(tile))}>
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
