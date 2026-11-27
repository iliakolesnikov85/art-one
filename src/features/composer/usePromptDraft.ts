import { useEffect, useRef, useState } from 'react'
import {
  addAttachment,
  applyIdea,
  createEmptyDraft,
  withText,
  withoutAttachment,
  type IdeaSelection,
  type ImageAttachment,
  type PromptDraft,
} from '../../domain/promptDraft.ts'

function releaseRemovedUploads(previous: ImageAttachment[], next: ImageAttachment[]) {
  const kept = new Set(next.map((item) => item.url))
  for (const attachment of previous) {
    if (attachment.source === 'upload' && !kept.has(attachment.url)) URL.revokeObjectURL(attachment.url)
  }
}

export function usePromptDraft() {
  const [draft, setDraft] = useState<PromptDraft>(createEmptyDraft)
  const draftRef = useRef(draft)

  useEffect(() => {
    draftRef.current = draft
  }, [draft])

  const commit = (next: PromptDraft, previous: PromptDraft) => {
    releaseRemovedUploads(previous.attachments, next.attachments)
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
      commit(addAttachment(current, attachment), current)
    },
    removeAttachment(id: string) {
      const current = draftRef.current
      commit(withoutAttachment(current, id), current)
    },
    applyIdea(idea: IdeaSelection) {
      const current = draftRef.current
      commit(applyIdea(current, idea), current)
    },
  }
}
