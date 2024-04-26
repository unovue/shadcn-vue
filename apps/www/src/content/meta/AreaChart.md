<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'data',
    'description': '<p>The source data, in which each entry is a dictionary.</p>\n',
    'type': 'Record<string, any>[]',
    'required': true
  },
  {
    'name': 'categories',
    'description': '<p>Select the categories from your data. Used to populate the legend and toolip.</p>\n',
    'type': 'string[]',
    'required': true
  },
  {
    'name': 'index',
    'description': '<p>Sets the key to map the data to the axis.</p>\n',
    'type': 'string',
    'required': true
  },
  {
    'name': 'colors',
    'description': '<p>Change the default colors.</p>\n',
    'type': 'string[]',
    'required': false
  },
  {
    'name': 'margin',
    'description': '<p>Margin of each the container</p>\n',
    'type': 'Spacing',
    'required': false,
    'default': '{ top: 0, bottom: 0, left: 0, right: 0 }'
  },
  {
    'name': 'filterOpacity',
    'description': '<p>Change the opacity of the non-selected field</p>\n',
    'type': 'number',
    'required': false,
    'default': '0.2'
  },
  {
    'name': 'xFormatter',
    'description': '<p>Function to format X label</p>\n',
    'type': '((tick: number | Date, i: number, ticks: number[] | Date[]) => string)',
    'required': false
  },
  {
    'name': 'yFormatter',
    'description': '<p>Function to format Y label</p>\n',
    'type': '((tick: number | Date, i: number, ticks: number[] | Date[]) => string)',
    'required': false
  },
  {
    'name': 'showXAxis',
    'description': '<p>Controls the visibility of the X axis.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showYAxis',
    'description': '<p>Controls the visibility of the Y axis.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showTooltip',
    'description': '<p>Controls the visibility of tooltip.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showLegend',
    'description': '<p>Controls the visibility of legend.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'showGridLine',
    'description': '<p>Controls the visibility of gridline.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'customTooltip',
    'description': '<p>Render custom tooltip component.</p>\n',
    'type': 'Component',
    'required': false
  },
  {
    'name': 'curveType',
    'description': '<p>Type of curve</p>\n',
    'type': 'CurveType',
    'required': false,
    'default': 'CurveType.MonotoneX'
  },
  {
    'name': 'showGradiant',
    'description': '<p>Controls the visibility of gradient.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  }
]" />

<APITable :type="'emit'" :data="[
  {
    'name': 'legendItemClick',
    'type': '[d: BulletLegendItemInterface, i: number]'
  }
]" />
