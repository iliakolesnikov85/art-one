import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('renders the homepage', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'What will you create next?' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ideas for You' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Wishes' })).toBeInTheDocument()
  })

  it('lets the user write a prompt and attach a gallery image', () => {
    render(<App />)

    const prompt = screen.getByRole('textbox', { name: 'Describe your creative idea' })
    fireEvent.change(prompt, { target: { value: 'A pink leather handbag on a studio sweep' } })
    expect(prompt).toHaveValue('A pink leather handbag on a studio sweep')

    fireEvent.click(screen.getAllByRole('button', { name: 'Use' })[0])

    expect(screen.getByRole('img', { name: 'Style Name' })).toBeInTheDocument()
    expect(prompt).toHaveValue('A pink leather handbag on a studio sweep')
  })

  it('fills the prompt from an idea and attaches its reference image', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Use idea Studio Shoot' }))

    expect(screen.getByRole('textbox', { name: 'Describe your creative idea' })).toHaveValue(
      'Create a full campaign studio photoshoot.',
    )
    expect(screen.getByRole('img', { name: 'Studio Shoot' })).toBeInTheDocument()
  })

  it('filters the gallery by a wishes category', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Jewelry' }))
    expect(screen.getAllByRole('button', { name: 'Use' })).toHaveLength(2)
  })
})
