import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('renders an empty page', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
