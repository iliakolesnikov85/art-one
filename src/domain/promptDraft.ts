export type AttachmentSource = 'upload' | 'gallery' | 'idea'

export type ImageAttachment = {
  id: string
  name: string
  url: string
  source: AttachmentSource
}

export type PromptDraft = {
  text: string
  attachments: ImageAttachment[]
}

export type IdeaSelection = {
  prompt: string
}

export function createEmptyDraft(): PromptDraft {
  return { text: '', attachments: [] }
}

export function withText(draft: PromptDraft, text: string): PromptDraft {
  return { ...draft, text }
}

export function addAttachment(draft: PromptDraft, attachment: ImageAttachment): PromptDraft {
  if (draft.attachments.some((item) => item.id === attachment.id)) return draft
  return { ...draft, attachments: [...draft.attachments, attachment] }
}

export function withoutAttachment(draft: PromptDraft, id: string): PromptDraft {
  return { ...draft, attachments: draft.attachments.filter((item) => item.id !== id) }
}

export function applyIdea(draft: PromptDraft, idea: IdeaSelection): PromptDraft {
  return {
    ...withText(draft, idea.prompt),
    attachments: draft.attachments.filter((item) => item.source !== 'idea'),
  }
}

export function hasPromptContent(draft: PromptDraft): boolean {
  return draft.text.trim().length > 0 || draft.attachments.length > 0
}
