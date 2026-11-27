import { useHomeCatalog } from '../../features/home/useHomeCatalog.ts'
import { usePromptDraft } from '../../features/composer/usePromptDraft.ts'
import { Hero } from './Hero.tsx'
import { IdeasSection } from './IdeasSection.tsx'
import { WishesGallery } from './WishesGallery.tsx'

export function HomePage() {
  const prompt = usePromptDraft()
  const catalog = useHomeCatalog()

  return (
    <div className="home">
      <Hero
        draft={prompt.draft}
        onTextChange={prompt.setText}
        onAttach={prompt.attach}
        onClearAttachment={prompt.clearAttachment}
      />
      {catalog.status === 'loading' ? (
        <p className="home-status" role="status">
          Loading
        </p>
      ) : null}
      {catalog.status === 'error' ? (
        <p className="home-status" role="alert">
          Could not load the home catalog.
        </p>
      ) : null}
      {catalog.status === 'ready' ? (
        <>
          <IdeasSection ideas={catalog.ideas} onApply={prompt.applyIdea} />
          <WishesGallery
            categories={catalog.categories}
            wishes={catalog.wishes}
            attachedId={prompt.draft.attachment?.id ?? null}
            onUse={prompt.attach}
          />
        </>
      ) : null}
    </div>
  )
}
