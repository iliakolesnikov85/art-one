import { useEffect, useState } from 'react'
import type { Category, Idea, Wish } from '../../domain/catalog.ts'
import type { CatalogService } from '../../services/catalogService.ts'
import { mockCatalogService } from '../../services/mockCatalogService.ts'

export type HomeCatalogState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; ideas: Idea[]; categories: Category[]; wishes: Wish[][] }

export function useHomeCatalog(service: CatalogService = mockCatalogService): HomeCatalogState {
  const [state, setState] = useState<HomeCatalogState>({ status: 'loading' })

  useEffect(() => {
    let active = true

    service.getHomeCatalog().then(
      (catalog) => {
        if (!active) return
        setState({ status: 'ready', ...catalog })
      },
      () => {
        if (!active) return
        setState({ status: 'error' })
      },
    )

    return () => {
      active = false
    }
  }, [service])

  return state
}
