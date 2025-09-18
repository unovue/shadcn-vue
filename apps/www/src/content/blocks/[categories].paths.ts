import { registriesIndexSchema } from 'shadcn-vue/schema'
import { z } from 'zod'
import { Index } from '../../../__registry__'
import { registryCategories } from '../../registry/registry-categories'

export default {
  paths() {
    return registryCategories.filter(category => !category.hidden).map((category) => {
      const index = z.record(registriesIndexSchema).parse(Index['new-york'])
      const blocks = Object.values(index).filter(block => block.category === category.slug).map(block => block.name)

      return {
        params: { categories: category.slug, blocks },
      }
    })
  },
}
