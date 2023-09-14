export const totalRevenueChartSeries = [
  {
    name: 'Revenue',
    data: [40, 45, 58, 54, 62, 58, 63, 60, 66],
  },
]

export const totalRevenueChartOptions = {
  chart: {
    type: 'line',
    sparkline: {
      enabled: true,
    },
    animations: {
      enabled: true,
    },
  },
  markers: {
    size: 3,
    colors: ['hsl(var(--background))'],
    strokeColors: 'hsl(var(--primary))',
  },
  colors: ['hsl(var(--primary))'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  yaxis: {
    min: 0,
  },
  tooltip: {
    enabled: false,
  },
  states: {
    normal: {
      filter: {
        type: 'none',
        value: 0,
      },
    },
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: 'none',
      },
    },
  },
}

export const subscriptionsChartSeries = [
  {
    name: 'Subscriptions',
    data: [40, 45, 32, 54, 65, 53, 63, 35],
  },
]

export const subscriptionsChartOptions = {
  chart: {
    type: 'bar',
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      distributed: true,
      columnWidth: '80%',
    },
  },
  markers: {
    size: 4,
    colors: ['hsl(var(--background))'],
    strokeColors: 'hsl(var(--primary)',
  },
  colors: ['hsl(var(--primary)'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  yaxis: {
    min: 0,
  },
  tooltip: {
    enabled: false,
  },
  states: {
    normal: {
      filter: {
        type: 'none',
        value: 0,
      },
    },
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: 'none',
      },
    },
  },
}

export const goalsMinutesChartSeries = [
  { name: 'Minutes', data: [15, 5, 60, 30, 45, 38, 42] },
  {
    name: 'Goal',
    data: [25, 18, 13, 21, 11, 17, 22],
  },
]

export const goalsMinutesChartOptions = {
  chart: {
    type: 'line',
    sparkline: {
      enabled: true,
    },
    animations: {
      enabled: true,
    },
  },
  markers: {
    size: 3,
    colors: 'hsl(var(--background))',
    strokeColors: 'hsl(var(--primary))',
  },
  colors: ['hsl(var(--primary))', 'hsl(var(--muted-foreground))'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  yaxis: {
    min: 0,
  },
  tooltip: {
    enabled: false,
  },
  states: {
    normal: {
      filter: {
        type: 'none',
        value: 0,
      },
    },
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: 'none',
      },
    },
  },
}
