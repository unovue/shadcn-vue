import { expect, it } from 'vitest'

import { resolveTree } from '../../src/utils/registry'

it('resolve tree', async () => {
  const index = [
    {
      name: 'button',
      dependencies: ['radix-vue'],
      type: 'components:ui',
      files: [
        'button/Button.vue',
        'button/index.ts',
      ],
    },
    {
      name: 'dialog',
      dependencies: ['radix-vue'],
      registryDependencies: ['button'],
      type: 'components:ui',
      files: ['dialog/Dialog.vue', 'dialog/DialogContent.vue', 'dialog/DialogDescription.vue', 'dialog/DialogFooter.vue', 'dialog/DialogHeader.vue', 'dialog/DialogTitle.vue', 'dialog/DialogTrigger.vue', 'dialog/index.ts'],
    },
    {
      name: 'input',
      registryDependencies: ['button'],
      type: 'components:ui',
      files: [
        'input/Input.vue',
        'input/index.ts',
      ],
    },
    {
      name: 'alert-dialog',
      dependencies: ['radix-vue'],
      registryDependencies: ['button', 'dialog'],
      type: 'components:ui',
      files: ['alert-dialog/AlertDialog.vue', 'alert-dialog/AlertDialogAction.vue', 'alert-dialog/AlertDialogCancel.vue', 'alert-dialog/AlertDialogContent.vue', 'alert-dialog/AlertDialogDescription.vue', 'alert-dialog/AlertDialogFooter.vue', 'alert-dialog/AlertDialogHeader.vue', 'alert-dialog/AlertDialogTitle.vue', 'alert-dialog/AlertDialogTrigger.vue', 'alert-dialog/index.ts'],
    },
    // {
    //   name: 'example-card',
    //   type: 'components:component',
    //   files: ['example-card.tsx'],
    //   registryDependencies: ['button', 'dialog', 'input'],
    // },
  ]

  expect(
    (await resolveTree(index, ['button'])).map(entry => entry.name).sort(),
  ).toEqual(['button'])

  expect(
    (await resolveTree(index, ['dialog'])).map(entry => entry.name).sort(),
  ).toEqual(['button', 'dialog'])

  expect(
    (await resolveTree(index, ['alert-dialog', 'dialog']))
      .map(entry => entry.name)
      .sort(),
  ).toEqual(['alert-dialog', 'button', 'dialog'])

  // expect(
  //   (await resolveTree(index, ['example-card']))
  //     .map(entry => entry.name)
  //     .sort(),
  // ).toEqual(['button', 'dialog', 'example-card', 'input'])

  expect(
    (await resolveTree(index, ['foo'])).map(entry => entry.name).sort(),
  ).toEqual([])

  expect(
    (await resolveTree(index, ['button', 'foo']))
      .map(entry => entry.name)
      .sort(),
  ).toEqual(['button'])
})
