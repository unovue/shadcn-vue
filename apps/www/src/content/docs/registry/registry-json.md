---
title: registry.json
description: Schema for running your own component registry.
---

The `registry.json` schema is used to define your custom component registry.

```json:line-numbers title="registry.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry.json",
  "name": "shadcn",
  "homepage": "https://shadcn-vue.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/HelloWorld/HelloWorld.vue",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

## Definitions

You can see the JSON Schema for `registry.json` [here](https://shadcn-vue.com/schema/registry.json).

### $schema

The `$schema` property is used to specify the schema for the `registry.json` file.

```json:line-numbers title="registry.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry.json"
}
```

### name

The `name` property is used to specify the name of your registry. This is used for data attributes and other metadata.

```json:line-numbers title="registry.json"
{
  "name": "acme"
}
```

### homepage

The homepage of your registry. This is used for data attributes and other metadata.

```json:line-numbers title="registry.json"
{
  "homepage": "https://acme.com"
}
```

### items

The `items` in your registry. Each item must implement the [registry-item schema specification](https://shadcn-vue.com/schema/registry-item.json).

```json:line-numbers title="registry.json"
{
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/HelloWorld/HelloWorld.vue",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

See the [registry-item schema documentation](/docs/registry/registry-item-json) for more information.
