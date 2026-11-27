import type { HomeCatalog } from '../domain/catalog.ts'

export type CatalogService = {
  getHomeCatalog(): Promise<HomeCatalog>
  readHomeCatalog?: () => HomeCatalog
}
