<script setup lang="ts">
import CustomChartTooltip from './CustomChartTooltip.vue'
import { LineChart } from '@/lib/registry/default/ui/chart-line'

const data = [
  {
    'year': 1970,
    'Export Growth Rate': 2.04,
    'Import Growth Rate': 1.53,
  },
  {
    'year': 1971,
    'Export Growth Rate': 1.96,
    'Import Growth Rate': 1.58,
  },
  {
    'year': 1972,
    'Export Growth Rate': 1.96,
    'Import Growth Rate': 1.61,
  },
  {
    'year': 1973,
    'Export Growth Rate': 1.93,
    'Import Growth Rate': 1.61,
  },
  {
    'year': 1974,
    'Export Growth Rate': 1.88,
    'Import Growth Rate': 1.67,
  },
  {
    'year': 1975,
    'Export Growth Rate': 1.79,
    'Import Growth Rate': 1.64,
  },
  {
    'year': 1976,
    'Export Growth Rate': 1.77,
    'Import Growth Rate': 1.62,
  },
  {
    'year': 1977,
    'Export Growth Rate': 1.74,
    'Import Growth Rate': 1.69,
  },
  {
    'year': 1978,
    'Export Growth Rate': 1.74,
    'Import Growth Rate': 1.7,
  },
  {
    'year': 1979,
    'Export Growth Rate': 1.77,
    'Import Growth Rate': 1.67,
  },
  {
    'year': 1980,
    'Export Growth Rate': 1.79,
    'Import Growth Rate': 1.7,
  },
  {
    'year': 1981,
    'Export Growth Rate': 1.81,
    'Import Growth Rate': 1.72,
  },
  {
    'year': 1982,
    'Export Growth Rate': 1.84,
    'Import Growth Rate': 1.73,
  },
  {
    'year': 1983,
    'Export Growth Rate': 1.77,
    'Import Growth Rate': 1.73,
  },
  {
    'year': 1984,
    'Export Growth Rate': 1.78,
    'Import Growth Rate': 1.78,
  },
  {
    'year': 1985,
    'Export Growth Rate': 1.78,
    'Import Growth Rate': 1.81,
  },
  {
    'year': 1986,
    'Export Growth Rate': 1.82,
    'Import Growth Rate': 1.89,
  },
  {
    'year': 1987,
    'Export Growth Rate': 1.82,
    'Import Growth Rate': 1.91,
  },
  {
    'year': 1988,
    'Export Growth Rate': 1.77,
    'Import Growth Rate': 1.94,
  },
  {
    'year': 1989,
    'Export Growth Rate': 1.76,
    'Import Growth Rate': 1.94,
  },
  {
    'year': 1990,
    'Export Growth Rate': 1.75,
    'Import Growth Rate': 1.97,
  },
  {
    'year': 1991,
    'Export Growth Rate': 1.62,
    'Import Growth Rate': 1.99,
  },
  {
    'year': 1992,
    'Export Growth Rate': 1.56,
    'Import Growth Rate': 2.12,
  },
  {
    'year': 1993,
    'Export Growth Rate': 1.5,
    'Import Growth Rate': 2.13,
  },
  {
    'year': 1994,
    'Export Growth Rate': 1.46,
    'Import Growth Rate': 2.15,
  },
  {
    'year': 1995,
    'Export Growth Rate': 1.43,
    'Import Growth Rate': 2.17,
  },
  {
    'year': 1996,
    'Export Growth Rate': 1.4,
    'Import Growth Rate': 2.2,
  },
  {
    'year': 1997,
    'Export Growth Rate': 1.37,
    'Import Growth Rate': 2.15,
  },
  {
    'year': 1998,
    'Export Growth Rate': 1.34,
    'Import Growth Rate': 2.07,
  },
  {
    'year': 1999,
    'Export Growth Rate': 1.32,
    'Import Growth Rate': 2.05,
  },
  {
    'year': 2000,
    'Export Growth Rate': 1.33,
    'Import Growth Rate': 2.07,
  },
  {
    'year': 2001,
    'Export Growth Rate': 1.31,
    'Import Growth Rate': 2.08,
  },
  {
    'year': 2002,
    'Export Growth Rate': 1.29,
    'Import Growth Rate': 2.1,
  },
  {
    'year': 2003,
    'Export Growth Rate': 1.27,
    'Import Growth Rate': 2.15,
  },
  {
    'year': 2004,
    'Export Growth Rate': 1.27,
    'Import Growth Rate': 2.21,
  },
  {
    'year': 2005,
    'Export Growth Rate': 1.26,
    'Import Growth Rate': 2.23,
  },
  {
    'year': 2006,
    'Export Growth Rate': 1.26,
    'Import Growth Rate': 2.29,
  },
  {
    'year': 2007,
    'Export Growth Rate': 1.27,
    'Import Growth Rate': 2.34,
  },
  {
    'year': 2008,
    'Export Growth Rate': 1.26,
    'Import Growth Rate': 2.36,
  },
  {
    'year': 2009,
    'Export Growth Rate': 1.26,
    'Import Growth Rate': 2.36,
  },
  {
    'year': 2010,
    'Export Growth Rate': 1.25,
    'Import Growth Rate': 2.35,
  },
  {
    'year': 2011,
    'Export Growth Rate': 1.24,
    'Import Growth Rate': 2.34,
  },
  {
    'year': 2012,
    'Export Growth Rate': 1.25,
    'Import Growth Rate': 2.39,
  },
  {
    'year': 2013,
    'Export Growth Rate': 1.22,
    'Import Growth Rate': 2.3,
  },
  {
    'year': 2014,
    'Export Growth Rate': 1.2,
    'Import Growth Rate': 2.35,
  },
  {
    'year': 2015,
    'Export Growth Rate': 1.17,
    'Import Growth Rate': 2.39,
  },
  {
    'year': 2016,
    'Export Growth Rate': 1.16,
    'Import Growth Rate': 2.41,
  },
  {
    'year': 2017,
    'Export Growth Rate': 1.13,
    'Import Growth Rate': 2.44,
  },
  {
    'year': 2018,
    'Export Growth Rate': 1.07,
    'Import Growth Rate': 2.45,
  },
  {
    'year': 2019,
    'Export Growth Rate': 1.03,
    'Import Growth Rate': 2.47,
  },
  {
    'year': 2020,
    'Export Growth Rate': 0.92,
    'Import Growth Rate': 2.48,
  },
  {
    'year': 2021,
    'Export Growth Rate': 0.82,
    'Import Growth Rate': 2.51,
  },
]
</script>

<template>
  <LineChart
    :data="data"
    index="year"
    :categories="['Export Growth Rate', 'Import Growth Rate']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
        : ''
    }"
    :custom-tooltip="CustomChartTooltip"
  />
</template>
