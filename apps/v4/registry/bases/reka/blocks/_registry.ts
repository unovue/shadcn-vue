import type { Registry } from "shadcn-vue/schema"

export const blocks: Registry["items"] = [
  {
    name: "cards",
    title: "Cards",
    type: "registry:block",
    files: [
      {
        path: "blocks/cards.vue",
        type: "registry:block",
      },
    ],
    registryDependencies: [
      "example",
      "alert-dialog",
      "avatar",
      "badge",
      "button",
      "button-group",
      "card",
      "checkbox",
      "dropdown-menu",
      "empty",
      "field",
      "input",
      "input-group",
      "item",
      "radio-group",
      "select",
      "separator",
      "sheet",
      "slider",
      "switch",
      "textarea",
      "tooltip",
    ],
    dependencies: [],
    categories: [
      "blocks",
    ],
  },
  {
    name: "chatgpt",
    title: "ChatGPT",
    type: "registry:block",
    files: [
      {
        path: "blocks/chatgpt.vue",
        type: "registry:block",
      },
    ],
    registryDependencies: [
      "example",
      "alert",
      "alert-dialog",
      "badge",
      "button",
      "card",
      "dropdown-menu",
      "field",
      "input-group",
      "item",
      "kbd",
      "popover",
      "tooltip",
    ],
    dependencies: [],
    categories: [
      "blocks",
    ],
  },
  {
    name: "elevenlabs",
    title: "ElevenLabs",
    type: "registry:block",
    files: [
      {
        path: "blocks/elevenlabs.vue",
        type: "registry:block",
      },
    ],
    registryDependencies: [
      "example",
      "button",
      "card",
    ],
    dependencies: [],
    categories: [
      "blocks",
    ],
  },
  {
    name: "github",
    title: "GitHub",
    type: "registry:block",
    files: [
      {
        path: "blocks/github.vue",
        type: "registry:block",
      },
    ],
    registryDependencies: [
      "example",
      "avatar",
      "button",
      "card",
      "command",
      "drawer",
      "dropdown-menu",
      "empty",
      "field",
      "input-group",
      "item",
      "kbd",
      "popover",
      "separator",
      "spinner",
      "tabs",
      "tooltip",
    ],
    dependencies: [],
    categories: [
      "blocks",
    ],
  },
  {
    name: "preview",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "alert",
      "badge",
      "button",
      "card",
      "item",
      "chart",
      "empty",
      "avatar",
      "tooltip",
      "field",
      "toggle-group",
      "dropdown-menu",
      "input-group",
      "separator",
      "spinner",
      "tabs",
      "checkbox",
      "native-select",
      "textarea",
      "input",
      "select",
      "table",
      "kbd",
      "progress",
      "skeleton",
      "useDesignSystemSearchParams",
      "fonts",
      "styles",
      "dialog",
      "alert-dialog",
      "button-group",
      "radio-group",
      "slider",
      "switch",
    ],
    files: [
      {
        path: "blocks/preview/page.vue",
        type: "registry:page",
        target: "pages/preview/index.vue",
      },
      {
        path: "blocks/preview/components/ActivateAgentDialog.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/AnalyticsCard.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/AnomalyAlert.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/AssignIssue.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/BarChartCard.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/BarVisualizer.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/BookAppointment.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/CodespacesCard.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/ContributionsActivity.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/Contributors.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/EnvironmentVariables.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/FeedbackForm.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/FileUpload.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/GithubProfile.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/IconPreviewGrid.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/InviteTeam.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/Invoice.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/LiveWaveform.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/NoTeamMembers.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/NotFound.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/ObservabilityCard.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/PieChartCard.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/ReportBug.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/ShippingAddress.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/Shortcuts.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/SkeletonLoading.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/SleepReport.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/StyleOverview.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/TypographySpecimen.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/UIElements.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/UsageCard.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/Visitors.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview/components/WeeklyFitnessSummary.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "preview-02",
    type: "registry:block",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
    ],
    registryDependencies: [
      "button",
      "card",
      "field",
      "input",
      "item",
      "badge",
      "separator",
      "chart",
      "input-group",
      "toggle-group",
      "label",
      "empty",
      "accordion",
      "tabs",
      "slider",
      "switch",
      "skeleton",
      "checkbox",
      "breadcrumb",
      "dropdown-menu",
      "select",
      "textarea",
      "progress",
      "radio-group",
      "table",
      "native-select",
      "sidebar",
      "combobox",
      "spinner",
      "calendar",
    ],
    files: [
      {
        path: "blocks/preview-02/page.vue",
        type: "registry:page",
        target: "pages/preview/index.vue",
      },
      {
        path: "blocks/preview-02/components/AccountAccess.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/AlbumCard.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/CardOverview.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/CatalogToolbar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/ClaimableBalance.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/ContributionHistory.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/CoverArt.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/DividendIncome.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/EmptyConnectBank.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/EmptyDistributeTrack.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/EmptyExploreCatalog.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/Faq.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/FrontDoor.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/IndexInvesting.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/KitchenIsland.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/LoadingCard.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/NewMilestone.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/NotificationSettings.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/Payments.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/PayoutThreshold.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/PowerUsage.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/Preferences.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/QrConnect.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/ReceivingMethod.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/RecentTransactions.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/ReleaseCatalog.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/RollerShades.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/SavingsProgress.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/SavingsTargets.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/SidebarNav.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/SocialLinks.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/StockPerformance.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/SyncingState.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/TransferFunds.vue",
        type: "registry:component",
      },
      {
        path: "blocks/preview-02/components/UpcomingPayments.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "vercel",
    title: "Vercel",
    type: "registry:block",
    files: [
      {
        path: "blocks/vercel.vue",
        type: "registry:block",
      },
    ],
    registryDependencies: [
      "example",
      "alert",
      "badge",
      "button",
      "calendar",
      "card",
      "dialog",
      "dropdown-menu",
      "empty",
      "field",
      "input-group",
      "item",
      "native-select",
      "popover",
      "textarea",
    ],
    dependencies: [
      "reka-ui",
    ],
    categories: [
      "blocks",
    ],
  },
]
