import { describe, expect, it } from 'vitest'

import { registryResolveItemsTree } from '../../../src/utils/registry'

describe('registryResolveItemTree', () => {
  it('should resolve items tree', async () => {
    expect(
      await registryResolveItemsTree(['button'], {
        style: 'new-york',
        tailwind: {
          baseColor: 'stone',
        },
      }),
    ).toMatchSnapshot()
  })

  it('should resolve multiple items tree', async () => {
    expect(
      await registryResolveItemsTree(['button', 'input', 'command'], {
        style: 'default',
        tailwind: {
          baseColor: 'zinc',
        },
      }),
    ).toMatchSnapshot()
  })

  it('should resolve index', async () => {
    expect(
      await registryResolveItemsTree(['index', 'label'], {
        style: 'default',
        tailwind: {
          baseColor: 'zinc',
        },
      }),
    ).toMatchSnapshot()
  })
})
