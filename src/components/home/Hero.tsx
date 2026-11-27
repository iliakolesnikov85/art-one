import { useState } from 'react'
import { Composer } from './Composer.tsx'
import type { ImageAttachment, PromptDraft } from '../../domain/promptDraft.ts'

type CreationMode = 'chat' | 'tools'

type HeroProps = {
  draft: PromptDraft
  onTextChange: (text: string) => void
  onAttach: (attachment: ImageAttachment) => void
  onClearAttachment: () => void
}

export function Hero({ draft, onTextChange, onAttach, onClearAttachment }: HeroProps) {
  const [mode, setMode] = useState<CreationMode>('chat')

  return (
    <section className="hero">
      <h1>What will you create next?</h1>
      <div className="mode-switch" role="group" aria-label="Creation mode">
        <button
          type="button"
          className={mode === 'chat' ? 'is-selected' : ''}
          aria-pressed={mode === 'chat'}
          onClick={() => setMode('chat')}
        >
          Chat
        </button>
        <button
          type="button"
          className={mode === 'tools' ? 'is-selected' : ''}
          aria-pressed={mode === 'tools'}
          onClick={() => setMode('tools')}
        >
          Tools
        </button>
      </div>
      <Composer
        draft={draft}
        onTextChange={onTextChange}
        onAttach={onAttach}
        onClearAttachment={onClearAttachment}
      />
    </section>
  )
}
