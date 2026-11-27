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

  it('applies an idea as a prompt plus its reference image', () => {
    const draft = applyIdea(withText(createEmptyDraft(), 'old'), {
      id: 'studio-shoot',
      prompt: 'Create a full campaign studio photoshoot.',
      imageUrl: '/media/image-01.jpg',
      imageName: 'Studio Shoot',
    })

    expect(draft.text).toBe('Create a full campaign studio photoshoot.')
    expect(draft.attachment).toEqual({
      id: 'studio-shoot',
      name: 'Studio Shoot',
      url: '/media/image-01.jpg',
      source: 'idea',
    })
  })
})
