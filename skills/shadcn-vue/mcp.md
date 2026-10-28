# shadcn-vue MCP Server

The CLI includes an MCP server that lets AI assistants search, browse, view, and install components from registries.

---

## Setup

```bash
npx shadcn-vue@latest mcp                         # start the MCP server (stdio)
npx shadcn-vue@latest mcp init                    # prompt for the client and write its config
npx shadcn-vue@latest mcp init --client claude    # claude | cursor | vscode | codex | opencode
```

`mcp init` also installs `shadcn-vue` as a devDependency of the project. For Codex it prints the TOML snippet to add to `~/.codex/config.toml` manually.

Editor config files:

| Editor | Config file |
|--------|------------|
| Claude Code | `.mcp.json` |
| Cursor | `.cursor/mcp.json` |
| VS Code | `.vscode/mcp.json` |
| OpenCode | `opencode.json` |
| Codex | `~/.codex/config.toml` (manual) |

---

## Tools

The server is named `shadcnVue` (config key `shadcnVue`; `shadcn_vue` in Codex's TOML). Clients prefix the tool names below with the server name — in Claude Code they appear as `mcp__shadcnVue__<tool>`, e.g. `mcp__shadcnVue__search_items_in_registries`.

> **Tip:** MCP tools handle registry operations (search, view, install). For project configuration (aliases, framework, Tailwind version), use `npx shadcn-vue@latest info` — there is no MCP equivalent.

### `get_project_registries`

Returns registry names from `components.json`. If there is no `components.json`, it returns a text message telling you to run `init` (not a tool error).

**Input:** none

### `list_items_in_registries`

Lists all items from one or more registries.

**Input:** `registries` (string[]), `limit` (number, optional), `offset` (number, optional)

### `search_items_in_registries`

Fuzzy search across registries.

**Input:** `registries` (string[]), `query` (string), `limit` (number, optional), `offset` (number, optional)

### `view_items_in_registries`

View item details including full file contents.

**Input:** `items` (string[]) — e.g. `["@shadcn/button", "@shadcn/card"]`

### `get_item_examples_from_registries`

Find usage examples and demos with source code.

**Input:** `registries` (string[]), `query` (string) — e.g. `"accordion-demo"`, `"button example"`

### `get_add_command_for_items`

Returns the CLI install command.

**Input:** `items` (string[]) — e.g. `["@shadcn/button"]`

### `get_audit_checklist`

Returns a checklist for verifying components (imports, deps, lint, TypeScript).

**Input:** none

---

## Configuring Registries

Registries are set in `components.json`. The `@shadcn` registry is always built-in.

Registries listed in the [registry directory](https://shadcn-vue.com/docs/directory) (e.g. `@inspira-ui`, `@mapcn`, `@ai-elements`, `@elevenlabs-ui`) need no configuration: when an unknown `@namespace` is used, the CLI looks it up in the directory and writes it to `components.json`. Configure other registries manually:

```json
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json",
    "@private": {
      "url": "https://private.com/r/{name}.json",
      "headers": { "Authorization": "Bearer ${MY_TOKEN}" },
      "params": { "version": "latest" }
    }
  }
}
```

- Names must start with `@`.
- URLs must contain `{name}`.
- `${VAR}` references are resolved from environment variables.
- The object form accepts `url`, optional `headers` and optional `params` (query parameters added to the request).
