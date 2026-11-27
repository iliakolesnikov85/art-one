import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('renders the homepage from the catalog', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'What will you create next?' })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Ideas for You' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Wishes' })).toBeInTheDocument()
    expect(screen.getByText('Dewy Close-Up')).toBeInTheDocument()
    expect(screen.getByText('Summer Ride')).toBeInTheDocument()
    expect(screen.queryByText('Style Name')).not.toBeInTheDocument()
  })

  it('lets the user write a prompt and attach a gallery image', async () => {
    render(<App />)

    const prompt = screen.getByRole('textbox', { name: 'Describe your creative idea' })
    fireEvent.change(prompt, { target: { value: 'A pink leather handbag on a studio sweep' } })
    expect(prompt).toHaveValue('A pink leather handbag on a studio sweep')

    const [useWish] = await screen.findAllByRole('button', { name: 'Use' })
    fireEvent.click(useWish)

    expect(screen.getByRole('img', { name: 'Dewy Close-Up' })).toBeInTheDocument()
    expect(prompt).toHaveValue('A pink leather handbag on a studio sweep')
  })

  it('fills the prompt from an idea without a badge', async () => {
    render(<App />)

    fireEvent.click(await screen.findByRole('button', { name: 'Use idea Studio Shoot' }))

    expect(screen.getByRole('textbox', { name: 'Describe your creative idea' })).toHaveValue(
      'Create a full campaign studio photoshoot.',
    )
    expect(screen.queryByRole('img', { name: 'Studio Shoot' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Remove attached image' })).not.toBeInTheDocument()
  })

  it('filters the gallery by a wishes category', async () => {
    render(<App />)
    fireEvent.click(await screen.findByRole('button', { name: 'Jewelry' }))
    expect(screen.getAllByRole('button', { name: 'Use' })).toHaveLength(2)
    expect(screen.getByText('Palm Portrait')).toBeInTheDocument()
    expect(screen.getByText('Fur Arch')).toBeInTheDocument()
  })
})
