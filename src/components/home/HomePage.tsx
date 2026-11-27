import { IdeasSection } from './IdeasSection.tsx'
import { Hero } from './Hero.tsx'
import { WishesGallery } from './WishesGallery.tsx'
import { usePromptDraft } from '../../features/composer/usePromptDraft.ts'

export function HomePage() {
  const prompt = usePromptDraft()

  return (
    <div className="home">
      <Hero
        draft={prompt.draft}
        onTextChange={prompt.setText}
        onAttach={prompt.attach}
        onClearAttachment={prompt.clearAttachment}
      />
      <IdeasSection onApply={prompt.applyIdea} />
      <WishesGallery attachedId={prompt.draft.attachment?.id ?? null} onUse={prompt.attach} />
    </div>
  )
}
