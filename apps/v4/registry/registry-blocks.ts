import type { Registry } from "shadcn-vue/schema"

export const blocks: Registry["items"] = [
  {
    name: "dashboard-01",
    type: "registry:block",
    description: "A dashboard with sidebar, data table, and analytics cards.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "badge",
      "button",
      "card",
      "checkbox",
      "dropdown-menu",
      "label",
      "select",
      "table",
      "chart",
    ],
    files: [
      {
        path: "blocks/dashboard-01/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/dashboard-01/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/ChartAreaInteractive.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/DataTable.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/DraggableRow.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/DragHandle.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/NavDocuments.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/NavSecondary.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/NavUser.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/SectionCards.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/SiteHeader.vue",
        type: "registry:component",
      },
    ],
    categories: ["dashboard"],
  },
  {
    name: "login-01",
    type: "registry:block",
    description: "A simple login form.",
    registryDependencies: [
      "button",
      "card",
      "input",
      "label",
    ],
    files: [
      {
        path: "blocks/login-01/page.vue",
        type: "registry:page",
        target: "app/login/page.vue",
      },
      {
        path: "blocks/login-01/components/LoginForm.vue",
        type: "registry:component",
      },
    ],
    categories: ["authentication"],
  },
  {
    name: "login-02",
    type: "registry:block",
    description: "A two column login page with a cover image.",
    registryDependencies: [
      "button",
      "input",
      "label",
    ],
    files: [
      {
        path: "blocks/login-02/page.vue",
        type: "registry:page",
        target: "app/login/page.vue",
      },
      {
        path: "blocks/login-02/components/LoginForm.vue",
        type: "registry:component",
      },
    ],
    categories: ["authentication"],
  },
  {
    name: "login-03",
    type: "registry:block",
    description: "A login page with a muted background color.",
    registryDependencies: [
      "button",
      "card",
      "input",
      "label",
    ],
    files: [
      {
        path: "blocks/login-03/page.vue",
        type: "registry:page",
        target: "app/login/page.vue",
      },
      {
        path: "blocks/login-03/components/LoginForm.vue",
        type: "registry:component",
      },
    ],
    categories: ["authentication"],
  },
  {
    name: "login-04",
    type: "registry:block",
    description: "A login page with form and image.",
    registryDependencies: [
      "button",
      "card",
      "input",
      "label",
    ],
    files: [
      {
        path: "blocks/login-04/page.vue",
        type: "registry:page",
        target: "app/login/page.vue",
      },
      {
        path: "blocks/login-04/components/LoginForm.vue",
        type: "registry:component",
      },
    ],
    categories: ["authentication"],
  },
  {
    name: "login-05",
    type: "registry:block",
    description: "A simple email-only login page.",
    registryDependencies: [
      "button",
      "input",
      "label",
    ],
    files: [
      {
        path: "blocks/login-05/page.vue",
        type: "registry:page",
        target: "app/login/page.vue",
      },
      {
        path: "blocks/login-05/components/LoginForm.vue",
        type: "registry:component",
      },
    ],
    categories: ["authentication"],
  },
  {
    name: "products-01",
    type: "registry:block",
    description: "A products table with filtering and pagination.",
    registryDependencies: [
      "badge",
      "button",
      "checkbox",
      "dropdown-menu",
      "pagination",
      "select",
      "table",
      "tabs",
    ],
    files: [
      {
        path: "blocks/products-01/page.vue",
        type: "registry:page",
        target: "app/products/page.vue",
      },
      {
        path: "blocks/products-01/components/ProductsTable.vue",
        type: "registry:component",
      },
    ],
    categories: ["table"],
  },
  {
    name: "sidebar-01",
    type: "registry:block",
    description: "A simple sidebar with navigation grouped by section.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "label",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-01/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-01/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-01/components/SearchForm.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-01/components/VersionSwitcher.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-02",
    type: "registry:block",
    description: "A sidebar with collapsible sections.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "label",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-02/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-02/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-02/components/SearchForm.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-02/components/VersionSwitcher.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-03",
    type: "registry:block",
    description: "A sidebar with submenus.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
    ],
    files: [
      {
        path: "blocks/sidebar-03/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-03/components/AppSidebar.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-04",
    type: "registry:block",
    description: "A floating sidebar with submenus.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
    ],
    files: [
      {
        path: "blocks/sidebar-04/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-04/components/AppSidebar.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-05",
    type: "registry:block",
    description: "A sidebar with collapsible submenus.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "label",
    ],
    files: [
      {
        path: "blocks/sidebar-05/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-05/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-05/components/SearchForm.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-06",
    type: "registry:block",
    description: "A sidebar with submenus as dropdowns.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "dropdown-menu",
      "button",
      "card",
    ],
    files: [
      {
        path: "blocks/sidebar-06/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-06/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-06/components/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-06/components/SidebarOptInForm.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-07",
    type: "registry:block",
    description: "A sidebar that collapses to icons.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "dropdown-menu",
      "avatar",
    ],
    files: [
      {
        path: "blocks/sidebar-07/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-07/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/components/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/components/NavProjects.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/components/NavUser.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/components/TeamSwitcher.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-08",
    type: "registry:block",
    description: "An inset sidebar with secondary navigation.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "dropdown-menu",
      "avatar",
    ],
    files: [
      {
        path: "blocks/sidebar-08/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-08/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/components/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/components/NavProjects.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/components/NavSecondary.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/components/NavUser.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-09",
    type: "registry:block",
    description: "Collapsible nested sidebars.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "label",
      "switch",
      "avatar",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-09/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-09/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-09/components/NavUser.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-10",
    type: "registry:block",
    description: "A sidebar in a popover.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "button",
      "popover",
      "dropdown-menu",
      "collapsible",
    ],
    files: [
      {
        path: "blocks/sidebar-10/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-10/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/NavActions.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/NavFavorites.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/NavSecondary.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/NavWorkspaces.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/TeamSwitcher.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-11",
    type: "registry:block",
    description: "A sidebar with a collapsible file tree.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
    ],
    files: [
      {
        path: "blocks/sidebar-11/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-11/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-11/components/Tree.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-12",
    type: "registry:block",
    description: "A sidebar with a calendar.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "calendar",
      "avatar",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-12/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-12/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-12/components/Calendars.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-12/components/DatePicker.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-12/components/NavUser.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-13",
    type: "registry:block",
    description: "A sidebar in a dialog.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "button",
      "dialog",
    ],
    files: [
      {
        path: "blocks/sidebar-13/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-13/components/SettingsDialog.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-14",
    type: "registry:block",
    description: "A sidebar on the right.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
    ],
    files: [
      {
        path: "blocks/sidebar-14/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-14/components/AppSidebar.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-15",
    type: "registry:block",
    description: "A left and right sidebar.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "calendar",
      "avatar",
      "dropdown-menu",
      "collapsible",
    ],
    files: [
      {
        path: "blocks/sidebar-15/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-15/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/Calendars.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/DatePicker.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/NavFavorites.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/NavSecondary.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/NavUser.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/NavWorkspaces.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/SidebarLeft.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/SidebarRight.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/TeamSwitcher.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-16",
    type: "registry:block",
    description: "A sidebar with a header and a search form.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "dropdown-menu",
      "avatar",
      "button",
    ],
    files: [
      {
        path: "blocks/sidebar-16/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
      {
        path: "blocks/sidebar-16/components/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/NavProjects.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/NavSecondary.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/NavUser.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/SearchForm.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/SiteHeader.vue",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-demo",
    type: "registry:block",
    description: "A demo sidebar showcasing various features and components.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "button",
      "dropdown-menu",
      "collapsible",
    ],
    files: [
      {
        path: "blocks/sidebar-demo/page.vue",
        type: "registry:page",
        target: "app/dashboard/page.vue",
      },
    ],
    categories: ["sidebar", "dashboard", "demo"],
  },
]
