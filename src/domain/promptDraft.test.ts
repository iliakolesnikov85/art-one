import { describe, expect, it } from 'vitest'
import {
  applyIdea,
  createEmptyDraft,
  hasPromptContent,
  withAttachment,
  withText,
  withoutAttachment,
} from './promptDraft.ts'

describe('promptDraft', () => {
  it('starts empty', () => {
    expect(createEmptyDraft()).toEqual({ text: '', attachment: null })
    expect(hasPromptContent(createEmptyDraft())).toBe(false)
  })

  it('stores prompt text', () => {
    const draft = withText(createEmptyDraft(), 'A studio handbag')
    expect(draft.text).toBe('A studio handbag')
    expect(hasPromptContent(draft)).toBe(true)
  })

  it('attaches and removes an image without dropping the prompt', () => {
    const withPrompt = withText(createEmptyDraft(), 'Keep this text')
    const attached = withAttachment(withPrompt, {
      id: 'tile-1',
      name: 'Style Name',
      url: '/media/image-04.jpg',
      source: 'gallery',
    })

    expect(attached.text).toBe('Keep this text')
    expect(attached.attachment?.url).toBe('/media/image-04.jpg')
    expect(withoutAttachment(attached)).toEqual(withPrompt)
  })

  it('applies an idea as prompt text and drops an idea badge', () => {
    const withBadge = withAttachment(withText(createEmptyDraft(), 'old'), {
      id: 'smart-retouch',
      name: 'Smart Retouch',
      url: '/media/image-02.jpg',
      source: 'idea',
    })
    const draft = applyIdea(withBadge, {
      prompt: 'Retouch the product and fix visible imperfections.',
    })

    expect(draft.text).toBe('Retouch the product and fix visible imperfections.')
    expect(draft.attachment).toBeNull()
  })

  it('keeps a gallery image when an idea fills the prompt', () => {
    const attached = withAttachment(createEmptyDraft(), {
      id: 'tile-1',
      name: 'Style Name',
      url: '/media/image-04.jpg',
      source: 'gallery',
    })
    const draft = applyIdea(attached, {
      prompt: 'Retouch the product and fix visible imperfections.',
    })

    expect(draft.text).toBe('Retouch the product and fix visible imperfections.')
    expect(draft.attachment).toEqual(attached.attachment)
  })
})
