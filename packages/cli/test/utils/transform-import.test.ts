import { expect, it } from 'vitest'
import { transform } from '../../src/utils/transformers'

it('transform import', async () => {
  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
    import { Button } from "@/lib/registry/new-york/ui/button"
    import { Label} from "ui/label"
    import { Box } from "@/lib/registry/new-york/box"

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
      },
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
      import { Button } from "@/lib/registry/new-york/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/lib/registry/new-york/box"

      import { cn, foo } from "@/lib/utils"
      import { bar } from "@/lib/utils/bar"
      `,
      config: {
        aliases: {
          components: '~/src/components',
          utils: '~/lib',
        },
      },
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.ts',
      raw: `import { Foo } from "bar"
      import { Button } from "@/lib/registry/new-york/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/lib/registry/new-york/box"

    import { cn } from "@/lib/utils"
    import { bar } from "@/lib/utils/bar"
    `,
      config: {
        aliases: {
          components: '~/src/components',
          utils: '~/src/utils',
        },
      },
    }),
  ).toMatchSnapshot()
})
