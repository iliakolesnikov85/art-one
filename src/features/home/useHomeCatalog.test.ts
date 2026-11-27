import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { HomeCatalog } from '../../domain/catalog.ts'
import type { CatalogService } from '../../services/catalogService.ts'
import { useHomeCatalog } from './useHomeCatalog.ts'

const emptyCatalog: HomeCatalog = { ideas: [], categories: [], wishes: [] }

describe('useHomeCatalog', () => {
  it('paints the bundled catalog on the first render', async () => {
    const { result } = renderHook(() => useHomeCatalog())

    expect(result.current.status).toBe('ready')
    await act(async () => {
      await Promise.resolve()
    })
    expect(result.current.status).toBe('ready')
    if (result.current.status !== 'ready') return
    expect(result.current.wishes.flat().map((wish) => wish.name)).toContain('Dewy Close-Up')
  })

  it('shows a remote catalog after it resolves', async () => {
    const service: CatalogService = {
      getHomeCatalog: () => Promise.resolve(emptyCatalog),
    }
    const { result } = renderHook(() => useHomeCatalog(service))

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('ready'))
  })
})
