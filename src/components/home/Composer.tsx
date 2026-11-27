import { useId, useRef } from 'react'
import { hasPromptContent, type ImageAttachment, type PromptDraft } from '../../domain/promptDraft.ts'
import { ChevronIcon, CloseIcon, PlusIcon, SendIcon, SlidersIcon, SparkIcon } from '../icons/Icon.tsx'

type ComposerProps = {
  draft: PromptDraft
  onTextChange: (text: string) => void
  onAttach: (attachment: ImageAttachment) => void
  onClearAttachment: () => void
}

export function Composer({ draft, onTextChange, onAttach, onClearAttachment }: ComposerProps) {
  const inputId = useId()
  const fileRef = useRef<HTMLInputElement>(null)
  const ready = hasPromptContent(draft)

  const openFilePicker = () => {
    fileRef.current?.click()
  }

  const attachFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return
    onAttach({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
      source: 'upload',
    })
  }

  return (
    <section className="composer" aria-label="Prompt">
      <p className="pro-unlock">
        <SparkIcon className="token-spark" />
        <span>Unlock more features with Pro</span>
      </p>
      <form
        className="composer-form"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <div className="composer-body">
          {draft.attachment ? (
            <div className="attachment">
              <img src={draft.attachment.url} alt={draft.attachment.name} />
              <span>{draft.attachment.name}</span>
              <button type="button" aria-label="Remove attached image" onClick={onClearAttachment}>
                <CloseIcon />
              </button>
            </div>
          ) : null}
          <label className="sr-only" htmlFor={inputId}>
            Describe your creative idea
          </label>
          <textarea
            id={inputId}
            value={draft.text}
            placeholder="Describe your creative idea"
            rows={2}
            onChange={(event) => onTextChange(event.target.value)}
          />
        </div>
        <div className="composer-controls">
          <div className="composer-options">
            <button className="round-button" type="button" aria-label="Attach image" onClick={openFilePicker}>
              <PlusIcon />
            </button>
            <input
              ref={fileRef}
              className="sr-only"
              type="file"
              accept="image/*"
              aria-label="Choose an image to attach"
              onChange={(event) => {
                attachFile(event.target.files?.[0])
                event.target.value = ''
              }}
            />
            <span className="control-divider" />
            <button className="mode-button" type="button">
              <SlidersIcon />
              <span>Auto</span>
              <ChevronIcon className="chevron" />
            </button>
          </div>
          <button className={ready ? 'send-button is-ready' : 'send-button'} type="submit" aria-label="Send prompt">
            <SendIcon />
          </button>
        </div>
      </form>
    </section>
  )
}
