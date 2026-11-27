import { useRef, useState } from 'react'
import {
  applyIdea,
  createEmptyDraft,
  withAttachment,
  withText,
  withoutAttachment,
  type IdeaSelection,
  type ImageAttachment,
  type PromptDraft,
} from '../../domain/promptDraft.ts'

function releaseUpload(attachment: ImageAttachment | null) {
  if (attachment?.source === 'upload') URL.revokeObjectURL(attachment.url)
}

export function usePromptDraft() {
  const [draft, setDraft] = useState<PromptDraft>(createEmptyDraft)
  const draftRef = useRef(draft)
  draftRef.current = draft

  const commit = (next: PromptDraft, previous: PromptDraft) => {
    if (previous.attachment && previous.attachment.url !== next.attachment?.url) {
      releaseUpload(previous.attachment)
    }
    draftRef.current = next
    setDraft(next)
  }

  return {
    draft,
    setText(text: string) {
      const current = draftRef.current
      commit(withText(current, text), current)
    },
    attach(attachment: ImageAttachment) {
      const current = draftRef.current
      commit(withAttachment(current, attachment), current)
    },
    clearAttachment() {
      const current = draftRef.current
      commit(withoutAttachment(current), current)
    },
    applyIdea(idea: IdeaSelection) {
      const current = draftRef.current
      commit(applyIdea(current, idea), current)
    },
  }
}
