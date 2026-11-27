import { useEffect, useRef, useState } from 'react'
import type { Category, HomeCatalog, Idea, Wish } from '../../domain/catalog.ts'
import type { CatalogService } from '../../services/catalogService.ts'
import { mockCatalogService } from '../../services/mockCatalogService.ts'

export type HomeCatalogState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; ideas: Idea[]; categories: Category[]; wishes: Wish[][] }

function readyState(catalog: HomeCatalog): HomeCatalogState {
  return { status: 'ready', ...catalog }
}

function initialState(service: CatalogService): HomeCatalogState {
  const cached = service.readHomeCatalog?.()
  return cached ? readyState(cached) : { status: 'loading' }
}

export function useHomeCatalog(service: CatalogService = mockCatalogService): HomeCatalogState {
  const [state, setState] = useState<HomeCatalogState>(() => initialState(service))
  const appliedService = useRef(service)

  useEffect(() => {
    const cached = service.readHomeCatalog?.()
    if (cached) {
      if (appliedService.current !== service) {
        appliedService.current = service
        setState(readyState(cached))
      }
      return
    }

    let active = true
    if (appliedService.current !== service) {
      appliedService.current = service
      setState({ status: 'loading' })
    }

    service.getHomeCatalog().then(
      (catalog) => {
        if (!active) return
        setState(readyState(catalog))
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
