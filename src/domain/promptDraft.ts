export type AttachmentSource = 'upload' | 'gallery' | 'idea'

export type ImageAttachment = {
  id: string
  name: string
  url: string
  source: AttachmentSource
}

export type PromptDraft = {
  text: string
  attachment: ImageAttachment | null
}

export type IdeaSelection = {
  id: string
  prompt: string
  imageUrl: string
  imageName: string
}

export function createEmptyDraft(): PromptDraft {
  return { text: '', attachment: null }
}

export function withText(draft: PromptDraft, text: string): PromptDraft {
  return { ...draft, text }
}

export function withAttachment(draft: PromptDraft, attachment: ImageAttachment): PromptDraft {
  return { ...draft, attachment }
}

export function withoutAttachment(draft: PromptDraft): PromptDraft {
  return { ...draft, attachment: null }
}

export function applyIdea(draft: PromptDraft, idea: IdeaSelection): PromptDraft {
  return {
    text: idea.prompt,
    attachment: {
      id: idea.id,
      name: idea.imageName,
      url: idea.imageUrl,
      source: 'idea',
    },
  }
}

export function hasPromptContent(draft: PromptDraft): boolean {
  return draft.text.trim().length > 0 || draft.attachment !== null
}
