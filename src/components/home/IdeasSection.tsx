import { useState } from 'react'
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

  const refresh = () => {
    setItems((current) => {
      if (current.length < 2) return current
      return [...current.slice(1), current[0]]
    })
  }

  return (
    <section className="ideas" aria-labelledby="ideas-heading">
      <div className="section-heading">
        <h2 id="ideas-heading">Ideas for You</h2>
        <button className="round-button" type="button" aria-label="Refresh ideas" onClick={refresh}>
          <RefreshIcon />
        </button>
      </div>
      <ul className="idea-row">
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
    </section>
  )
}
