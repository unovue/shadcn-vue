<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'colors',
    'description': '<p>Change the default colors.</p>\n',
    'type': 'string[]',
    'required': false
  },
  {
    'name': 'index',
    'description': '<p>Sets the key to map the data to the axis.</p>\n',
    'type': 'string',
    'required': true
  },
  {
    'name': 'data',
    'description': '<p>The source data, in which each entry is a dictionary.</p>\n',
    'type': 'Record<string, any>[]',
    'required': true
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
    'name': 'category',
    'description': '<p>Sets the name of the key containing the quantitative chart values.</p>\n',
    'type': 'string',
    'required': true
  },
  {
    'name': 'type',
    'description': '<p>Change the type of the chart</p>\n',
    'type': '\'donut\' | \'pie\'',
    'required': false,
    'default': '\'donut\''
  },
  {
    'name': 'sortFunction',
    'description': '<p>Function to sort the segment</p>\n',
    'type': '((a: any, b: any) => number)',
    'required': false
  },
  {
    'name': 'valueFormatter',
    'description': '<p>Controls the formatting for the label.</p>\n',
    'type': '((tick: number, i?: number, ticks?: number[]) => string)',
    'required': false,
    'default': '`${tick}`'
  },
  {
    'name': 'customTooltip',
    'description': '<p>Render custom tooltip component.</p>\n',
    'type': 'DefineComponent',
    'required': false
  }
]" />
