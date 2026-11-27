import { describe, expect, it } from 'vitest'
import {
  addAttachment,
  applyIdea,
  createEmptyDraft,
  hasPromptContent,
  withText,
  withoutAttachment,
} from './promptDraft.ts'

const dewy = {
  id: 'tile-1',
  name: 'Dewy Close-Up',
  url: '/media/image-04.jpg',
  source: 'gallery' as const,
}

const palm = {
  id: 'tile-2',
  name: 'Palm Portrait',
  url: '/media/image-05.jpg',
  source: 'gallery' as const,
}

describe('promptDraft', () => {
  it('starts empty', () => {
    expect(createEmptyDraft()).toEqual({ text: '', attachments: [] })
    expect(hasPromptContent(createEmptyDraft())).toBe(false)
  })

  it('stores prompt text', () => {
    const draft = withText(createEmptyDraft(), 'A studio handbag')
    expect(draft.text).toBe('A studio handbag')
    expect(hasPromptContent(draft)).toBe(true)
  })

  it('keeps several gallery images and drops one without the prompt', () => {
    const withPrompt = withText(createEmptyDraft(), 'Keep this text')
    const attached = addAttachment(addAttachment(withPrompt, dewy), palm)

    expect(attached.text).toBe('Keep this text')
    expect(attached.attachments.map((item) => item.name)).toEqual(['Dewy Close-Up', 'Palm Portrait'])
    expect(addAttachment(attached, dewy).attachments).toHaveLength(2)
    expect(withoutAttachment(attached, dewy.id)).toEqual(addAttachment(withPrompt, palm))
    expect(hasPromptContent(attached)).toBe(true)
  })

  it('applies an idea as prompt text and drops an idea badge', () => {
    const withBadge = addAttachment(withText(createEmptyDraft(), 'old'), {
      id: 'smart-retouch',
      name: 'Smart Retouch',
      url: '/media/image-02.jpg',
      source: 'idea',
    })
    const draft = applyIdea(withBadge, {
      prompt: 'Retouch the product and fix visible imperfections.',
    })

    expect(draft.text).toBe('Retouch the product and fix visible imperfections.')
    expect(draft.attachments).toEqual([])
  })

  it('keeps gallery images when an idea fills the prompt', () => {
    const attached = addAttachment(addAttachment(createEmptyDraft(), dewy), palm)
    const draft = applyIdea(attached, {
      prompt: 'Retouch the product and fix visible imperfections.',
    })

    expect(draft.text).toBe('Retouch the product and fix visible imperfections.')
    expect(draft.attachments).toEqual([dewy, palm])
  })
})
