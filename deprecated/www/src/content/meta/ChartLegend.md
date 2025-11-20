<!-- This file was automatic generated. Do not edit it manually -->

<APITable :type="'prop'" :data="[
  {
    'name': 'items',
    'description': '',
    'type': 'BulletLegendItemInterface[]',
    'required': false,
    'default': '[]'
  }
]" />

<APITable :type="'emit'" :data="[
  {
    'name': 'legendItemClick',
    'type': '[d: BulletLegendItemInterface, i: number]'
  },
  {
    'name': 'update:items',
    'type': '[payload: BulletLegendItemInterface[]]'
  }
]" />
