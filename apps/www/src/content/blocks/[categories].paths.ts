import { z } from 'zod'
import { Index } from '../../../__registry__'
import { registryCategories } from '../../registry/registry-categories'
import { registryEntrySchema } from '../../registry/schema'

export default {
  paths() {
    return registryCategories.filter(category => !category.hidden).map((category) => {
      const index = z.record(registryEntrySchema).parse(Index['new-york'])
      const blocks = Object.values(index).filter(block => block.category === category.slug).map(block => block.name)

      return {
        params: { categories: category.slug, blocks },
      }
    })
  },
}
