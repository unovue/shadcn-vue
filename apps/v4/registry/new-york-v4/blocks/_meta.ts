interface BlockMeta {
  iframeHeight?: string
  className?: string
  description: string
  mobile?: "component"
  categories?: string[]
}

export const blockMeta = {
  "sidebar-01": {
    description: "A simple sidebar with navigation grouped by section.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-02": {
    description: "A sidebar with collapsible sections.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-03": {
    description: "A sidebar with submenus.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-04": {
    description: "A floating sidebar with submenus.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-05": {
    description: "A sidebar with collapsible submenus.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-06": {
    description: "A sidebar with submenus as dropdowns.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-07": {
    description: "A sidebar that collapses to icons",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-08": {
    description: "An inset sidebar with secondary navigation.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-09": {
    description: "Collapsible nested sidebars.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-10": {
    description: "A sidebar in a popover.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-11": {
    description: "A sidebar with a collapsible file tree.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-12": {
    description: "A sidebar with a calendar.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-13": {
    description: "A sidebar in a dialog.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-14": {
    description: "A sidebar on the right.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-15": {
    description: "A left and right sidebar.",
    categories: ["sidebar", "dashboard"],
  },
  "sidebar-16": {
    description: "A sidebar with a sticky site header.",
    categories: ["sidebar", "dashboard"],
  },
  "login-01": {
    description: "A simple login form.",
    categories: ["authentication", "login"],
  },
  "login-02": {
    description: "A two column login page with a cover image.",
    categories: ["authentication", "login"],
  },
  "login-03": {
    description: "A login page with a muted background color.",
    categories: ["authentication", "login"],
  },
  "login-04": {
    description: "A login page with form and image.",
    categories: ["authentication", "login"],
  },
  "login-05": {
    description: "A simple email-only login page.",
    categories: ["authentication", "login"],
  },
  "dashboard-01": {
    description: "A dashboard with sidebar, charts and data table.",
    categories: ["dashboard"],
  },
  "demo-sidebar": {
    description: "Your first sidebar.",
  },
  "demo-sidebar-header": {
    description: "A sidebar header with a dropdown menu.",
  },
  "demo-sidebar-footer": {
    description: "A sidebar footer with a dropdown menu.",
  },
  "demo-sidebar-group": {
    description: "A sidebar group.",
  },
  "demo-sidebar-group-collapsible": {
    description: "A sidebar with a collapsible group.",
  },
  "demo-sidebar-group-action": {
    description: "A sidebar with a group action.",
  },
  "demo-sidebar-menu": {
    description: "A sidebar menu with a list of projects.",
  },
  "demo-sidebar-menu-action": {
    description: "A sidebar menu action with a dropdown menu.",
  },
  "demo-sidebar-menu-sub": {
    description: "A sidebar menu sub.",
  },
  "demo-sidebar-menu-collapsible": {
    description: "A collapsible sidebar menu.",
  },
  "demo-sidebar-menu-badge": {
    description: "A sidebar menu badge.",
  },
  "demo-sidebar-controlled": {
    description: "A controlled sidebar.",
  },
  "calendar-01": {
    description: "A simple calendar.",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-4 py-12 items-start md:py-20 justify-center min-w-0",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-02": {
    description: "Multiple months with single selection.",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-4 py-12 items-start md:py-20 justify-center min-w-0",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-03": {
    description: "Multiple months with multiple selection.",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-4 py-12 items-start md:py-20 justify-center min-w-0",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-04": {
    description: "Single month with range selection",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-4 py-12 items-start md:py-20 justify-center min-w-0 xl:pt-28",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-05": {
    description: "Multiple months with range selection",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-06": {
    description: "Range selection with minimum days",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-07": {
    description: "Range selection with minimum and maximum days",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-08": {
    description: "Calendar with disabled days",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-09": {
    description: "Calendar with disabled weekends",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-10": {
    description: "Today button",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-11": {
    description: "Start and end of month",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-12": {
    description: "Localized calendar",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-13": {
    description: "With Month and Year Dropdown",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-14": {
    description: "With Booked/Unavailable Days",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-15": {
    description: "With Week Numbers",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-16": {
    description: "With time picker",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start justify-center min-w-0",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-17": {
    description: "With time picker inline",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-18": {
    description: "Variable size",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-19": {
    description: "With presets",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start justify-center min-w-0",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-20": {
    description: "With time presets",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start justify-center min-w-0",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-21": {
    description: "Custom days and formatters",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start justify-center min-w-0",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-22": {
    description: "Date picker",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-23": {
    description: "Date range picker",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-24": {
    description: "Date and Time picker",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-25": {
    description: "Date and Time range picker",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-26": {
    description: "Date range picker with time",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-27": {
    description: "Chart filter",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start justify-center min-w-0",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-28": {
    description: "Input with date picker",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-29": {
    description: "Natural language date picker",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-30": {
    description: "With little-date",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-31": {
    description: "With event slots",
    iframeHeight: "700px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "calendar-32": {
    description: "Date picker in a drawer",
    iframeHeight: "600px",
    className:
      "w-full bg-surface min-h-svh flex px-6 py-12 items-start md:pt-20 justify-center min-w-0 xl:py-24",
    mobile: "component",
    categories: ["calendar", "date"],
  },
  "signup-01": {
    description: "A simple signup form.",
    categories: ["authentication", "signup"],
  },
  "signup-02": {
    description: "A two column signup page with a cover image.",
    categories: ["authentication", "signup"],
  },
  "signup-03": {
    description: "A signup page with a muted background color.",
    categories: ["authentication", "signup"],
  },
  "signup-04": {
    description: "A signup page with form and image.",
    categories: ["authentication", "signup"],
  },
  "signup-05": {
    description: "A simple signup form with social providers.",
    categories: ["authentication", "signup"],
  },
  "otp-01": {
    description: "A simple OTP verification form.",
    categories: ["authentication", "otp"],
  },
  "otp-02": {
    description: "A two column OTP page with a cover image.",
    categories: ["authentication", "otp"],
  },
  "otp-03": {
    description: "An OTP page with a muted background color.",
    categories: ["authentication", "otp"],
  },
  "otp-04": {
    description: "An OTP page with form and image.",
    categories: ["authentication", "otp"],
  },
  "otp-05": {
    description: "A simple OTP form with social providers.",
    categories: ["authentication", "otp"],
  },
} as Record<string, BlockMeta>
