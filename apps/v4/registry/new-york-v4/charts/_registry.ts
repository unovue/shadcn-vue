import type { Registry } from "shadcn-vue/schema"

export const charts: Registry["items"] = [
  {
    name: "ChartAreaAxes",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartAreaAxes.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-area",
    ],
  },
  {
    name: "ChartAreaGradient",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartAreaGradient.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-area",
    ],
  },
  {
    name: "ChartAreaIcons",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartAreaIcons.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-area",
    ],
  },
  {
    name: "ChartAreaInteractive",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
      "select",
    ],
    files: [
      {
        path: "charts/ChartAreaInteractive.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-area",
    ],
  },
  {
    name: "ChartBarDefault",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartBarDefault.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-bar",
    ],
  },
  {
    name: "ChartBarHorizontal",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartBarHorizontal.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-bar",
    ],
  },
  {
    name: "ChartBarInteractive",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartBarInteractive.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-bar",
    ],
  },
  {
    name: "ChartBarMultiple",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartBarMultiple.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-bar",
    ],
  },
  {
    name: "ChartLineDefault",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartLineDefault.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-line",
    ],
  },
  {
    name: "ChartLineInteractive",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartLineInteractive.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-line",
    ],
  },
  {
    name: "ChartLineLinear",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartLineLinear.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-line",
    ],
  },
  {
    name: "ChartLineStep",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartLineStep.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-line",
    ],
  },
  {
    name: "ChartPieDonut",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartPieDonut.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-pie",
    ],
  },
  {
    name: "ChartPieDonutText",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartPieDonutText.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-pie",
    ],
  },
  {
    name: "ChartPieSimple",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartPieSimple.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-pie",
    ],
  },
  {
    name: "ChartPieStacked",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartPieStacked.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-pie",
    ],
  },
  {
    name: "ChartTooltipDefault",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartTooltipDefault.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-tooltip",
    ],
  },
  {
    name: "ChartTooltipIcons",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartTooltipIcons.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-tooltip",
    ],
  },
  {
    name: "ChartTooltipIndicatorLine",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartTooltipIndicatorLine.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-tooltip",
    ],
  },
  {
    name: "ChartTooltipIndicatorNone",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartTooltipIndicatorNone.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-tooltip",
    ],
  },
  {
    name: "ChartTooltipLabelCustom",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartTooltipLabelCustom.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-tooltip",
    ],
  },
  {
    name: "ChartTooltipLabelFormatter",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartTooltipLabelFormatter.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-tooltip",
    ],
  },
  {
    name: "ChartTooltipLabelNone",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "chart",
      "card",
    ],
    files: [
      {
        path: "charts/ChartTooltipLabelNone.vue",
        type: "registry:block",
      },
    ],
    categories: [
      "chart",
      "chart-tooltip",
    ],
  },
]
