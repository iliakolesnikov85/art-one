import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('renders the homepage from the catalog', () => {
    render(<App />)
    expect(screen.queryByText('Loading')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'What will you create next?' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ideas for You' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Wishes' })).toBeInTheDocument()
    expect(screen.getByText('Dewy Close-Up')).toBeInTheDocument()
    expect(screen.getByText('Summer Ride')).toBeInTheDocument()
    expect(screen.queryByText('Style Name')).not.toBeInTheDocument()
  })

  it('lets the user write a prompt and attach a gallery image', () => {
    render(<App />)

    const prompt = screen.getByRole('textbox', { name: 'Describe your creative idea' })
    fireEvent.change(prompt, { target: { value: 'A pink leather handbag on a studio sweep' } })
    expect(prompt).toHaveValue('A pink leather handbag on a studio sweep')

    const useWishes = screen.getAllByRole('button', { name: 'Use' })
    fireEvent.click(useWishes[0])
    fireEvent.click(useWishes[1])
    fireEvent.click(useWishes[0])

    expect(screen.getByRole('img', { name: 'Dewy Close-Up' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Palm Portrait' })).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: 'Dewy Close-Up' })).toHaveLength(1)
    expect(screen.getByRole('button', { name: 'Attach Dewy Close-Up' }).closest('article')).toHaveClass('is-selected')
    expect(screen.getByRole('button', { name: 'Attach Palm Portrait' }).closest('article')).toHaveClass('is-selected')
    expect(prompt).toHaveValue('A pink leather handbag on a studio sweep')

    fireEvent.click(screen.getByRole('button', { name: 'Send prompt' }))
    expect(prompt).toHaveValue('A pink leather handbag on a studio sweep')
    expect(screen.getByRole('img', { name: 'Dewy Close-Up' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Palm Portrait' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Remove Dewy Close-Up' }))
    expect(screen.queryByRole('img', { name: 'Dewy Close-Up' })).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Palm Portrait' })).toBeInTheDocument()
  })

  it('fills the prompt from an idea without a badge', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Use idea Studio Shoot' }))

    expect(screen.getByRole('textbox', { name: 'Describe your creative idea' })).toHaveValue(
      'Create a full campaign studio photoshoot.',
    )
    expect(screen.queryByRole('img', { name: 'Studio Shoot' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^Remove / })).not.toBeInTheDocument()
  })

  it('filters the gallery by a wishes category', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Jewelry' }))
    expect(screen.getAllByRole('button', { name: 'Use' })).toHaveLength(2)
    expect(screen.getByText('Palm Portrait')).toBeInTheDocument()
    expect(screen.getByText('Fur Arch')).toBeInTheDocument()
  })
})
