import type { Registry } from "shadcn-vue/schema"

export const blocks: Registry["items"] = [
  {
    name: "dashboard-01",
    type: "registry:block",
    description: "A dashboard with sidebar, charts and data table.",
    dependencies: [
      "@unovis/vue",
      "@unovis/ts",
      "@tanstack/vue-table",
    ],
    registryDependencies: [
      "sidebar",
      "chart",
      "card",
      "select",
      "badge",
      "button",
      "checkbox",
      "dropdown-menu",
      "label",
      "table",
      "tabs",
      "avatar",
      "separator",
    ],
    files: [
      {
        path: "blocks/dashboard-01/page.vue",
        type: "registry:page",
        target: "pages/dashboard/index.vue",
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
        path: "blocks/dashboard-01/components/DragHandle.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/DraggableRow.vue",
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
    categories: [
      "dashboard",
    ],
  },
  {
    name: "login-01",
    type: "registry:block",
    description: "A simple login form.",
    registryDependencies: [
      "button",
      "card",
      "field",
      "input",
    ],
    files: [
      {
        path: "blocks/login-01/page.vue",
        type: "registry:page",
        target: "pages/login/index.vue",
      },
      {
        path: "blocks/login-01/components/LoginForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "login",
    ],
  },
  {
    name: "login-02",
    type: "registry:block",
    description: "A two column login page with a cover image.",
    registryDependencies: [
      "button",
      "field",
      "input",
    ],
    files: [
      {
        path: "blocks/login-02/page.vue",
        type: "registry:page",
        target: "pages/login/index.vue",
      },
      {
        path: "blocks/login-02/components/LoginForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "login",
    ],
  },
  {
    name: "login-03",
    type: "registry:block",
    description: "A login page with a muted background color.",
    registryDependencies: [
      "button",
      "card",
      "field",
      "input",
    ],
    files: [
      {
        path: "blocks/login-03/page.vue",
        type: "registry:page",
        target: "pages/login/index.vue",
      },
      {
        path: "blocks/login-03/components/LoginForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "login",
    ],
  },
  {
    name: "login-04",
    type: "registry:block",
    description: "A login page with form and image.",
    registryDependencies: [
      "button",
      "card",
      "field",
      "input",
    ],
    files: [
      {
        path: "blocks/login-04/page.vue",
        type: "registry:page",
        target: "pages/login/index.vue",
      },
      {
        path: "blocks/login-04/components/LoginForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "login",
    ],
  },
  {
    name: "login-05",
    type: "registry:block",
    description: "A simple email-only login page.",
    registryDependencies: [
      "button",
      "field",
      "input",
    ],
    files: [
      {
        path: "blocks/login-05/page.vue",
        type: "registry:page",
        target: "pages/login/index.vue",
      },
      {
        path: "blocks/login-05/components/LoginForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "login",
    ],
  },
  {
    name: "otp-01",
    type: "registry:block",
    description: "A simple OTP verification form.",
    registryDependencies: [
      "button",
      "card",
      "field",
      "input-otp",
    ],
    files: [
      {
        path: "blocks/otp-01/page.vue",
        type: "registry:page",
        target: "pages/otp/index.vue",
      },
      {
        path: "blocks/otp-01/components/OTPForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "otp",
    ],
  },
  {
    name: "otp-02",
    type: "registry:block",
    description: "A two column OTP page with a cover image.",
    registryDependencies: [
      "button",
      "field",
      "input-otp",
    ],
    files: [
      {
        path: "blocks/otp-02/page.vue",
        type: "registry:page",
        target: "pages/otp/index.vue",
      },
      {
        path: "blocks/otp-02/components/OTPForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "otp",
    ],
  },
  {
    name: "otp-03",
    type: "registry:block",
    description: "An OTP page with a muted background color.",
    registryDependencies: [
      "button",
      "card",
      "field",
      "input-otp",
    ],
    files: [
      {
        path: "blocks/otp-03/page.vue",
        type: "registry:page",
        target: "pages/otp/index.vue",
      },
      {
        path: "blocks/otp-03/components/OTPForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "otp",
    ],
  },
  {
    name: "otp-04",
    type: "registry:block",
    description: "An OTP page with form and image.",
    registryDependencies: [
      "button",
      "card",
      "field",
      "input-otp",
    ],
    files: [
      {
        path: "blocks/otp-04/page.vue",
        type: "registry:page",
        target: "pages/otp/index.vue",
      },
      {
        path: "blocks/otp-04/components/OTPForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "otp",
    ],
  },
  {
    name: "otp-05",
    type: "registry:block",
    description: "A simple OTP form with social providers.",
    registryDependencies: [
      "button",
      "field",
      "input-otp",
    ],
    files: [
      {
        path: "blocks/otp-05/page.vue",
        type: "registry:page",
        target: "pages/otp/index.vue",
      },
      {
        path: "blocks/otp-05/components/OTPForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "otp",
    ],
  },
  {
    name: "products-01",
    type: "registry:block",
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
        target: "pages/products/index.vue",
      },
      {
        path: "blocks/products-01/components/ProductsTable.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-01",
    type: "registry:block",
    description: "A simple sidebar with navigation grouped by section.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "label",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-01/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-02",
    type: "registry:block",
    description: "A sidebar with collapsible sections.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "collapsible",
      "label",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-02/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-03",
    type: "registry:block",
    description: "A sidebar with submenus.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
    ],
    files: [
      {
        path: "blocks/sidebar-03/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
      },
      {
        path: "blocks/sidebar-03/components/AppSidebar.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-04",
    type: "registry:block",
    description: "A floating sidebar with submenus.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
    ],
    files: [
      {
        path: "blocks/sidebar-04/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
      },
      {
        path: "blocks/sidebar-04/components/AppSidebar.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-05",
    type: "registry:block",
    description: "A sidebar with collapsible submenus.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "collapsible",
      "label",
    ],
    files: [
      {
        path: "blocks/sidebar-05/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-06",
    type: "registry:block",
    description: "A sidebar with submenus as dropdowns.",
    dependencies: [
      "@vueuse/core",
    ],
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "dropdown-menu",
      "button",
      "card",
    ],
    files: [
      {
        path: "blocks/sidebar-06/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-07",
    type: "registry:block",
    description: "A sidebar that collapses to icons",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "collapsible",
      "dropdown-menu",
      "avatar",
    ],
    files: [
      {
        path: "blocks/sidebar-07/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-08",
    type: "registry:block",
    description: "An inset sidebar with secondary navigation.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "collapsible",
      "dropdown-menu",
      "avatar",
    ],
    files: [
      {
        path: "blocks/sidebar-08/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-09",
    type: "registry:block",
    description: "Collapsible nested sidebars.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "label",
      "switch",
      "avatar",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-09/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-10",
    type: "registry:block",
    description: "A sidebar in a popover.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "button",
      "popover",
      "dropdown-menu",
      "collapsible",
    ],
    files: [
      {
        path: "blocks/sidebar-10/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-11",
    type: "registry:block",
    description: "A sidebar with a collapsible file tree.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "collapsible",
    ],
    files: [
      {
        path: "blocks/sidebar-11/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-12",
    type: "registry:block",
    description: "A sidebar with a calendar.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "collapsible",
      "calendar",
      "avatar",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-12/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-13",
    type: "registry:block",
    description: "A sidebar in a dialog.",
    registryDependencies: [
      "breadcrumb",
      "button",
      "dialog",
      "sidebar",
    ],
    files: [
      {
        path: "blocks/sidebar-13/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
      },
      {
        path: "blocks/sidebar-13/components/SettingsDialog.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-14",
    type: "registry:block",
    description: "A sidebar on the right.",
    registryDependencies: [
      "breadcrumb",
      "sidebar",
    ],
    files: [
      {
        path: "blocks/sidebar-14/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
      },
      {
        path: "blocks/sidebar-14/components/AppSidebar.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-15",
    type: "registry:block",
    description: "A left and right sidebar.",
    registryDependencies: [
      "breadcrumb",
      "separator",
      "sidebar",
      "collapsible",
      "calendar",
      "dropdown-menu",
      "avatar",
    ],
    files: [
      {
        path: "blocks/sidebar-15/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-16",
    type: "registry:block",
    description: "A sidebar with a sticky site header.",
    registryDependencies: [
      "sidebar",
      "collapsible",
      "dropdown-menu",
      "avatar",
      "label",
      "breadcrumb",
      "button",
      "separator",
    ],
    files: [
      {
        path: "blocks/sidebar-16/page.vue",
        type: "registry:page",
        target: "pages/sidebar/index.vue",
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
    categories: [
      "sidebar",
      "dashboard",
    ],
  },
  {
    name: "sidebar-demo",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
    ],
    files: [
      {
        path: "blocks/sidebar-demo/page.vue",
        type: "registry:page",
        target: "pages/sidebar-demo/index.vue",
      },
    ],
  },
  {
    name: "signup-01",
    type: "registry:block",
    description: "A simple signup form.",
    registryDependencies: [
      "button",
      "card",
      "field",
      "input",
    ],
    files: [
      {
        path: "blocks/signup-01/page.vue",
        type: "registry:page",
        target: "pages/signup/index.vue",
      },
      {
        path: "blocks/signup-01/components/SignupForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "signup",
    ],
  },
  {
    name: "signup-02",
    type: "registry:block",
    description: "A two column signup page with a cover image.",
    registryDependencies: [
      "button",
      "field",
      "input",
    ],
    files: [
      {
        path: "blocks/signup-02/page.vue",
        type: "registry:page",
        target: "pages/signup/index.vue",
      },
      {
        path: "blocks/signup-02/components/SignupForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "signup",
    ],
  },
  {
    name: "signup-03",
    type: "registry:block",
    description: "A signup page with a muted background color.",
    registryDependencies: [
      "button",
      "card",
      "field",
      "input",
    ],
    files: [
      {
        path: "blocks/signup-03/page.vue",
        type: "registry:page",
        target: "pages/signup/index.vue",
      },
      {
        path: "blocks/signup-03/components/SignupForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "signup",
    ],
  },
  {
    name: "signup-04",
    type: "registry:block",
    description: "A signup page with form and image.",
    registryDependencies: [
      "button",
      "card",
      "field",
      "input",
    ],
    files: [
      {
        path: "blocks/signup-04/page.vue",
        type: "registry:page",
        target: "pages/signup/index.vue",
      },
      {
        path: "blocks/signup-04/components/SignupForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "signup",
    ],
  },
  {
    name: "signup-05",
    type: "registry:block",
    description: "A simple signup form with social providers.",
    registryDependencies: [
      "button",
      "field",
      "input",
    ],
    files: [
      {
        path: "blocks/signup-05/page.vue",
        type: "registry:page",
        target: "pages/signup/index.vue",
      },
      {
        path: "blocks/signup-05/components/SignupForm.vue",
        type: "registry:component",
      },
    ],
    categories: [
      "authentication",
      "signup",
    ],
  },
]
