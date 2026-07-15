import assert from 'node:assert/strict'
import { buildRegistriesIndex } from './registries-index'

// valid entries -> flat @name -> url map
assert.deepEqual(
  buildRegistriesIndex([
    { name: '@acme', title: 'Acme', description: 'd', url: 'https://acme.com/r/{name}.json', homepage: 'https://acme.com' },
    { name: '@foo', title: 'Foo', description: 'd', url: 'https://foo.dev/{name}.json', homepage: 'https://foo.dev' },
  ]),
  {
    '@acme': 'https://acme.com/r/{name}.json',
    '@foo': 'https://foo.dev/{name}.json',
  },
)

// url missing the {name} placeholder throws
assert.throws(
  () => buildRegistriesIndex([
    { name: '@acme', title: 'a', description: 'd', url: 'https://acme.com/r/button.json', homepage: 'h' },
  ]),
  /\{name\}/,
)

// name not matching the @-regex throws
assert.throws(
  () => buildRegistriesIndex([
    { name: 'acme', title: 'a', description: 'd', url: 'https://acme.com/{name}.json', homepage: 'h' },
  ]),
  /Invalid registry name/,
)

// duplicate name throws
assert.throws(
  () => buildRegistriesIndex([
    { name: '@acme', title: 'a', description: 'd', url: 'https://a.com/{name}.json', homepage: 'h' },
    { name: '@acme', title: 'b', description: 'd', url: 'https://b.com/{name}.json', homepage: 'h' },
  ]),
  /Duplicate/,
)

console.log('registries-index: all assertions passed')
