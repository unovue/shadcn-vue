---
title: MCP Server
description: Use the shadcn-vue MCP server to browse, search, and install components from registries.
---

The shadcn-vue MCP Server allows AI assistants to interact with items from registries. You can browse available components, search for specific ones, view usage examples, and install them directly into your project using natural language.

For example, you can ask an AI assistant to "Build a landing page using components from the acme registry", "Find me a login form from the shadcn registry", or "Show me examples of how to use the button component".

Registries are configured in your project's `components.json` file. When you run `mcp init`, the CLI automatically installs `shadcn-vue@latest` as a dev dependency in your project.

```json title="components.json" showLineNumbers
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}
```

<Callout>
  The shadcn-vue MCP server automatically works with the default shadcn-vue registry without any additional configuration.
</Callout>

---

## Quick Start

Select your MCP client and follow the instructions to configure the shadcn-vue MCP server. If you'd like to do it manually, see the [Configuration](#configuration) section.

<TabsMarkdown>
  <TabMarkdown title="Claude Code">

<Steps>

### Run the init command

Run the following command in your project:

```bash
npx shadcn-vue@latest mcp init --client claude
```

This will:
- Create `.mcp.json` configuration file
- Install `shadcn-vue@latest` as a dev dependency

### Restart Claude Code

After running the init command, restart Claude Code to load the MCP server.

<Callout class="mt-6">

**Tip:** You can use the `/mcp` command in Claude Code to debug and verify the MCP server connection.

</Callout>

### Try example prompts

Once connected, try the following prompts:

- Show me all available components in the shadcn registry
- Add the button, dialog and card components to my project
- Create a contact form using components from the shadcn registry
- Show me examples of how to use the accordion component

</Steps>

  </TabMarkdown>

  <TabMarkdown title="Cursor">

<Steps>

### Run the init command

Run the following command in your project:

```bash
npx shadcn-vue@latest mcp init --client cursor
```

This will:
- Create `.cursor/mcp.json` configuration file
- Install `shadcn-vue@latest` as a dev dependency

### Enable the MCP server

Open **Cursor Settings** and **enable the MCP server** for shadcn-vue. You should see a green dot next to the shadcn-vue server in the MCP server list.

### Try example prompts

Once enabled, try the following prompts:

- Show me all available components in the shadcn registry
- Add the button, dialog and card components to my project
- Create a contact form using components from the shadcn registry
- Show me examples of how to use the accordion component

</Steps>

  </TabMarkdown>

  <TabMarkdown title="VS Code">

<Steps>

### Run the init command

Run the following command in your project:

```bash
npx shadcn-vue@latest mcp init --client vscode
```

This will:
- Create `.vscode/mcp.json` configuration file
- Install `shadcn-vue@latest` as a dev dependency

### Start the MCP server

Open `.vscode/mcp.json` and click **Start** next to the shadcn-vue server.

### Try example prompts

Once started, try the following prompts with GitHub Copilot:

- Show me all available components in the shadcn registry
- Add the button, dialog and card components to my project
- Create a contact form using components from the shadcn registry
- Show me examples of how to use the accordion component

</Steps>

  </TabMarkdown>

  <TabMarkdown title="Codex">

<Callout class="mt-0">

 The `shadcn-vue` CLI cannot automatically update `~/.codex/config.toml`. You'll need to add the configuration manually for Codex.

</Callout>

<Steps>

### Run the init command

Run the following command in your project:

```bash
npx shadcn-vue@latest mcp init --client codex
```

This will install `shadcn-vue@latest` as a dev dependency in your project.

### Configure Codex manually

Add the following configuration to `~/.codex/config.toml`:

```toml title="~/.codex/config.toml"
[mcp_servers.shadcn_vue]
command = "npx"
args = [
  "shadcn-vue@latest",
  "mcp"
]
```

### Restart Codex

Restart Codex to load the MCP server.

### Try example prompts

Once configured, try the following prompts:

- Show me all available components in the shadcn registry
- Add the button, dialog and card components to my project
- Create a contact form using components from the shadcn registry
- Show me examples of how to use the accordion component

</Steps>

  </TabMarkdown>
</TabsMarkdown>

---

## What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open protocol that enables AI assistants to securely connect to external data sources and tools. With the shadcn-vue MCP server, your AI assistant gains direct access to:

- **Browse Registries** - List all configured registries in your project
- **Browse Components** - List all available components, blocks, and templates from any configured registry
- **Search Across Registries** - Find specific components by name or functionality using fuzzy matching
- **View Details** - Get detailed information about components including files and dependencies
- **Get Examples** - Find usage examples and demos with complete working code
- **Install with Natural Language** - Generate CLI commands and add components using simple prompts
- **Verify Installation** - Use an audit checklist to ensure everything is working correctly
- **Support for Multiple Registries** - Access public registries, private company libraries, and third-party sources

---

## How It Works

The MCP server acts as a bridge between your AI assistant, component registries and the shadcn-vue CLI.

1. **Configuration** - Run `mcp init` to set up MCP for your client and install dependencies
2. **Registry Connection** - MCP connects to configured registries (shadcn-vue, private registries, third-party sources)
3. **Natural Language** - You describe what you need in plain English
4. **AI Processing** - The assistant uses the 7 available MCP tools to:
   - Discover available registries
   - Search and browse components
   - View detailed information
   - Find usage examples
   - Generate installation commands
5. **Component Delivery** - Components are fetched and installed in your project
6. **Verification** - Use the audit checklist to ensure everything works correctly

---

## Available Tools

The shadcn-vue MCP server provides 7 tools that AI assistants can use to interact with component registries:

### 1. get_project_registries

Get a list of all configured registries from your `components.json` file.

**Use case:** Check which registries are available in your project before searching or listing items.

### 2. list_items_in_registries

List all items from specified registries with pagination support.

**Parameters:**
- `registries` - Array of registry names (e.g., `['@shadcn', '@acme']`)
- `limit` (optional) - Maximum number of items to return
- `offset` (optional) - Number of items to skip for pagination

**Use case:** Browse all available components, blocks, or templates in a registry.

### 3. search_items_in_registries

Search for items across registries using fuzzy matching on names and descriptions.

**Parameters:**
- `registries` - Array of registry names to search
- `query` - Search query string for fuzzy matching
- `limit` (optional) - Maximum number of items to return
- `offset` (optional) - Number of items to skip for pagination

**Use case:** Find specific components by name or functionality (e.g., "button", "form", "auth").

### 4. view_items_in_registries

View detailed information about specific registry items including name, description, type, and file contents.

**Parameters:**
- `items` - Array of item names with registry prefix (e.g., `['@shadcn/button', '@shadcn/card']`)

**Use case:** Get detailed implementation information for components. For usage examples, use `get_item_examples_from_registries` instead.

### 5. get_item_examples_from_registries

Find usage examples and demos with complete code implementation.

**Parameters:**
- `registries` - Array of registry names to search
- `query` - Search query for examples (e.g., 'accordion-demo', 'button example')

**Use case:** Get working examples with full code. Search for patterns like `{component}-demo`, `{component} example`, or `example-{name}`.

**Common example patterns:**
- `accordion-demo`, `button-demo`, `card-demo`
- `button example`, `form example`
- `example-booking-form`, `example-hero`

### 6. get_add_command_for_items

Generate the CLI command to add specific items to your project.

**Parameters:**
- `items` - Array of items with registry prefix (e.g., `['@shadcn/button', '@shadcn/card']`)

**Use case:** Get the exact command needed to install components. The AI assistant can then execute this command to add components to your project.

### 7. get_audit_checklist

Get a checklist to verify everything is working correctly after adding or generating components.

**Use case:** After installing components, use this to ensure imports are correct, dependencies are installed, and there are no linting or TypeScript errors.

**Checklist includes:**
- Verify imports (named vs default)
- Check image configuration (for Next.js)
- Ensure dependencies are installed
- Check for linting errors
- Check for TypeScript errors
- Test with Playwright (if available)

---

## Tool Workflow

Here's a typical workflow for using the MCP tools:

1. **Discover** - Use `get_project_registries` to see available registries
2. **Search** - Use `search_items_in_registries` or `list_items_in_registries` to find components
3. **Explore** - Use `view_items_in_registries` to see component details
4. **Learn** - Use `get_item_examples_from_registries` to find usage examples
5. **Install** - Use `get_add_command_for_items` to generate the install command
6. **Verify** - Use `get_audit_checklist` to ensure everything is working

---

## Supported Registries

The shadcn-vue MCP server works out of the box with any shadcn-compatible registry.

- **shadcn-vue Registry** - The default registry with all shadcn-vue components
- **Third-Party Registries** - Any registry following the shadcn registry specification
- **Private Registries** - Your company's internal component libraries
- **Namespaced Registries** - Multiple registries configured with `@namespace` syntax

---

## Configuration

You can use any MCP client to interact with the shadcn-vue MCP server. The easiest way to configure your client is by running `shadcn-vue mcp init --client <client>` (see [Quick Start](#quick-start)), which automatically creates the configuration file and installs dependencies.

For manual configuration, here are the instructions for the most popular clients:

<TabsMarkdown>
  <TabMarkdown title="Claude Code">

Add the following configuration to your project's `.mcp.json` file:

```json title=".mcp.json" showLineNumbers
{
  "mcpServers": {
    "shadcnVue": {
      "command": "npx",
      "args": ["shadcn-vue@latest", "mcp"]
    }
  }
}
```

After adding the configuration, restart Claude Code and run `/mcp` to see the shadcn-vue MCP server in the list. If you see `Connected`, you're good to go.

See the [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/mcp) for more details.

  </TabMarkdown>

  <TabMarkdown title="Cursor">

Add the shadcn-vue server to your project's `.cursor/mcp.json` configuration file:

```json title=".cursor/mcp.json" showLineNumbers
{
  "mcpServers": {
    "shadcnVue": {
      "command": "npx",
      "args": ["shadcn-vue@latest", "mcp"]
    }
  }
}
```

After adding the configuration, enable the shadcn-vue MCP server in Cursor Settings.

Once enabled, you should see a green dot next to the shadcn-vue server in the MCP server list and a list of available tools.

See the [Cursor MCP documentation](https://docs.cursor.com/en/context/mcp#using-mcp-json) for more details.

  </TabMarkdown>

  <TabMarkdown title="VS Code">

Add the shadcn-vue server to your project's `.vscode/mcp.json` configuration file:

```json title=".vscode/mcp.json" showLineNumbers
{
  "servers": {
    "shadcnVue": {
      "command": "npx",
      "args": ["shadcn-vue@latest", "mcp"]
    }
  }
}
```

After adding the configuration, open `.vscode/mcp.json` and click **Start** next to the shadcn-vue server.

See the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) for more details.

  </TabMarkdown>

  <TabMarkdown title="Codex">

<Callout>
 The `shadcn-vue` CLI cannot automatically update `~/.codex/config.toml`. You'll need to add the configuration manually.

</Callout>

Add the shadcn-vue server to `~/.codex/config.toml`:

```toml title="~/.codex/config.toml" showLineNumbers
[mcp_servers.shadcn_vue]
command = "npx"
args = [
  "shadcn-vue@latest",
  "mcp"
]
```

After adding the configuration, restart Codex to load the MCP server.

  </TabMarkdown>
</TabsMarkdown>

---

## Configuring Registries

The MCP server supports multiple registries through your project's `components.json` configuration. This allows you to access components from various sources including private registries and third-party providers.

Configure additional registries in your `components.json`:

```json title="components.json" showLineNumbers
{
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

<Callout>
  No configuration is needed to access the standard shadcn-vue
  registry.
</Callout>

---

## Authentication

For private registries requiring authentication, set environment variables in your `.env.local`:

```bash title=".env.local"
REGISTRY_TOKEN=your_token_here
API_KEY=your_api_key_here
```

For more details on registry authentication, see the [Registry documentation](/docs/registry).

---

## Example Prompts

Once the MCP server is configured, you can use natural language to interact with registries. Try one of the following prompts:

### Discover Registries

- What registries are configured in my project?
- Show me all available registries

### Browse & Search Components

- Show me all available components in the shadcn registry
- List all items from the `@shadcn` registry
- Find me a login form from the shadcn registry
- Search for authentication components
- Show me all button-related components

### View Component Details

- Show me the details of the `@shadcn/button` component
- What files are in the `@shadcn/card` component?
- Get information about `@shadcn/dialog` and `@shadcn/form`

### Find Usage Examples

- Show me examples of how to use the accordion component
- Find accordion-demo examples in the shadcn registry
- Get button examples with full code
- Show me example implementations of the dialog component
- Find booking form examples

### Install Components

- Add the button component to my project
- Install `@shadcn/button`, `@shadcn/dialog`, and `@shadcn/card`
- Create a login form using `shadcn-vue` components
- Build me a contact form with validation

### Work with Multiple Registries

- Show me components from the acme registry
- Install `@internal/auth-form`
- Build me a landing page using hero, features and testimonials sections from the acme registry
- Search for button components across `@shadcn` and `@acme` registries

### Post-Installation Verification

- Run the audit checklist
- Verify everything is working after adding components
- Check for any issues with the components I just installed

---

## Troubleshooting

### MCP Not Responding

If the MCP server isn't responding to prompts:

1. **Check Configuration** - Verify the MCP server is properly configured and enabled in your MCP client
2. **Restart MCP Client** - Restart your MCP client after configuration changes
3. **Verify Installation** - Ensure `shadcn-vue` is installed in your project
4. **Check Network** - Confirm you can access the configured registries

### Registry Access Issues

If components aren't loading from registries:

1. **Check components.json** - Verify registry URLs are correct
2. **Test Authentication** - Ensure environment variables are set for private registries
3. **Verify Registry** - Confirm the registry is online and accessible
4. **Check Namespace** - Ensure namespace syntax is correct (`@namespace/component`)

### Installation Failures

If components fail to install:

1. **Check Project Setup** - Ensure you have a valid `components.json` file
2. **Verify Paths** - Confirm the target directories exist
3. **Check Permissions** - Ensure write permissions for component directories
4. **Review Dependencies** - Check that required dependencies are installed

### No Tools or Prompts

If you see the `No tools or prompts` message, try the following:

1. **Clear the npx cache** - Run `npx clear-npx-cache`
2. **Re-enable the MCP server** - Try to re-enable the MCP server in your MCP client
3. **Check Logs** - In Cursor, you can see the logs under View -> Output and select `MCP: project-*` in the dropdown.

---

## Learn More

- [Registry Documentation](/docs/registry) - Complete guide to shadcn-vue registries
- [Registry Getting Started](/docs/registry/getting-started) - Learn how to set up your own registry
- [Registry Examples](/docs/registry/examples) - See examples of registry items
- [MCP Specification](https://modelcontextprotocol.io) - Learn about Model Context Protocol
