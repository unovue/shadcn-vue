import { expect, it } from 'vitest'
import { transform } from '../../src/utils/transformers'

it('transform @/styles/ paths to user aliases', async () => {
  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Button } from "@/styles/reka-lyra/ui/button"
    import { Input } from "@/styles/reka-nova/ui/input"
    import type { ButtonVariants } from "@/styles/reka-lyra/ui/button"
    import { cn } from "@/lib/utils"
    `,
      config: {
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
        typescript: true,
      },
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Button } from "@/styles/reka-lyra/ui/button"
    import { cn } from "@/lib/utils"
    `,
      config: {
        aliases: {
          components: '~/src/components',
          utils: '~/src/utils',
          ui: '~/src/ui',
        },
        typescript: true,
      },
    }),
  ).toMatchSnapshot()
})

it('transform import', async () => {
  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
    import { Button } from "@/registry/new-york/ui/button"
    import { Label} from "ui/label"
    import { Box } from "@/registry/new-york/box"

    import { cn } from "@/lib/utils"
    `,
      config: {
        tailwind: {
          baseColor: 'neutral',
          cssVariables: true,
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
        typescript: true,
      },
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
      import { Button } from "@/registry/new-york/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/registry/new-york/box"

      import { cn, foo } from "@/lib/utils"
      import { bar } from "@/lib/utils/bar"
      `,
      config: {
        aliases: {
          components: '~/src/components',
          utils: '~/lib',
        },
        typescript: true,
      },
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
      import { Button } from "@/registry/new-york/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/registry/new-york/box"

    import { cn } from "@/lib/utils"
    import { bar } from "@/lib/utils/bar"
    `,
      config: {
        aliases: {
          components: '~/src/components',
          utils: '~/src/utils',
        },
        typescript: true,
      },
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
      import { Button } from "@/registry/new-york/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/registry/new-york/box"

    import { cn } from "@/lib/utils"
    import { bar } from "@/lib/utils/bar"
    `,
      config: {
        aliases: {
          components: '~/src/components',
          utils: '~/src/utils',
          ui: '~/src/ui',
        },
        typescript: true,
      },
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
      import { Button } from "@/registry/new-york/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/registry/new-york/box"

    import { cn } from "@/lib/utils"
    import { bar } from "@/lib/utils/bar"
    `,
      config: {
        aliases: {
          components: '~/src/components',
          utils: '~/src/utils',
          ui: '~/src/ui',
        },
        typescript: true,
      },
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
      import { Button } from "@/components/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/registry/new-york/box"

    import { cn } from "@/lib/utils"
    `,
      config: {
        tailwind: {
          baseColor: 'neutral',
          cssVariables: true,
        },
        aliases: {
          components: '@custom-alias/components',
          utils: '@custom-alias/lib/utils',
        },
        typescript: true,
      },
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
      import { Button } from "@/components/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/registry/new-york/box"
      import Layout from "@/registry/blocks/layout/Layout.vue"


    import { cn } from "@/lib/utils"
    `,
      config: {
        tailwind: {
          baseColor: 'neutral',
          cssVariables: true,
        },
        aliases: {
          components: '@custom-alias/components',
          utils: '@custom-alias/lib/utils',
        },
        typescript: true,
      },
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
      import { Button } from "@/components/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/registry/new-york/box"

      import { cn } from "@/lib/utils"
      `,
      config: {
        tailwind: {
          baseColor: 'neutral',
          cssVariables: true,
        },
        aliases: {
          components: '@/components',
          utils: '~/utils/cn',
        },
        typescript: true,
      },
    }),
  ).toMatchSnapshot()
})

it.each([
  {
    name: 'default aliases',
    isRemote: false,
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
    },
  },
  {
    name: 'custom aliases',
    isRemote: false,
    aliases: {
      components: '~/src/components',
      utils: '~/src/utils',
      ui: '~/src/ui',
    },
  },
  {
    name: 'remote registry',
    isRemote: true,
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
    },
  },
])('leaves the cn package import untouched: $name', async ({ aliases, isRemote }) => {
  const result = await transform({
    filename: 'Button.vue',
    raw: `<script setup lang="ts">
import { cn } from "cn"
import { buttonVariants } from "@/registry/new-york-v4/ui/button"
</script>
`,
    config: {
      aliases,
      typescript: true,
    },
    isRemote,
  })

  expect(result).toContain(`import { cn } from "cn"`)
  expect(result).not.toContain('utils')
})
