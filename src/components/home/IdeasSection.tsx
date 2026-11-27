import { useEffect, useRef, useState } from 'react'
import type { Idea } from '../../domain/catalog.ts'
import type { IdeaSelection } from '../../domain/promptDraft.ts'
import { PlusIcon, RefreshIcon } from '../icons/Icon.tsx'

type IdeasSectionProps = {
  ideas: Idea[]
  onApply: (idea: IdeaSelection) => void
}

function selectionFrom(idea: Idea): IdeaSelection {
  return { prompt: idea.prompt }
}

export function IdeasSection({ ideas, onApply }: IdeasSectionProps) {
  const [items, setItems] = useState(ideas)
  const rowRef = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ left: false, right: false })

  const refresh = () => {
    setItems((current) => {
      if (current.length < 2) return current
      return [...current.slice(1), current[0]]
    })
  }

  useEffect(() => {
    const row = rowRef.current
    if (!row) return

    const update = () => {
      const max = row.scrollWidth - row.clientWidth
      setEdges({
        left: row.scrollLeft > 2,
        right: max - row.scrollLeft > 2,
      })
    }

    update()
    row.addEventListener('scroll', update, { passive: true })
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    observer?.observe(row)

    const onWheel = (event: WheelEvent) => {
      if (row.scrollWidth <= row.clientWidth) return
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.deltaY === 0) return
      const max = row.scrollWidth - row.clientWidth
      const atStart = row.scrollLeft <= 0 && event.deltaY < 0
      const atEnd = row.scrollLeft >= max - 1 && event.deltaY > 0
      if (atStart || atEnd) return
      event.preventDefault()
      row.scrollLeft += event.deltaY
    }

    row.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      row.removeEventListener('scroll', update)
      row.removeEventListener('wheel', onWheel)
      observer?.disconnect()
    }
  }, [items])

  const scrollerClass = [
    'idea-scroller',
    edges.left ? 'can-scroll-left' : '',
    edges.right ? 'can-scroll-right' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className="ideas" aria-labelledby="ideas-heading">
      <div className="section-heading">
        <h2 id="ideas-heading">Ideas for You</h2>
        <button className="round-button" type="button" aria-label="Refresh ideas" onClick={refresh}>
          <RefreshIcon />
        </button>
      </div>
      <div className={scrollerClass}>
        <ul className="idea-row" ref={rowRef}>
          {items.map((idea) => (
            <li key={idea.id}>
              <article className="idea-card">
                <img src={idea.imageUrl} alt="" />
                <div>
                  <h3>{idea.title}</h3>
                  <p>{idea.subtitle}</p>
                </div>
                <button type="button" aria-label={`Use idea ${idea.title}`} onClick={() => onApply(selectionFrom(idea))}>
                  <PlusIcon />
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
