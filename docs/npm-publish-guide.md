# Publishing to npm for npx Usage

This guide explains how to publish the Binance Futures MCP server to the npm registry so that users can run it directly via `npx` without needing to clone the repository.

## Prerequisites

- An [npm account](https://www.npmjs.com/signup)
- A unique package name (e.g., `@jarjut/binance-futures-mcp`)
- Bun installed on your local machine

## Step-by-Step Publishing

### 1. Prepare the Package
Ensure your `package.json` has the correct metadata. Specifically, the `bin` field must point to the compiled JavaScript file in the `dist` folder so that it works for all Node.js/Bun users.

```json
"bin": {
  "@jarjut/binance-futures-mcp": "dist/mcp-server.js"
}
```

### 2. Authenticate with npm
If you haven't already, log in to your npm account from your terminal:

```bash
npm login
```

### 3. Build the Package
Before publishing, you must compile the TypeScript source to JavaScript.

Run the build script:
```bash
bun run build
```
This generates the necessary files in the `dist/` directory.

### 4. Publish to the Registry
Publish your package to the npm registry:

```bash
npm publish
```

*Note: Because this is a scoped package (`@jarjut/...`), ensure `publishConfig.access` is set to `"public"` in `package.json`, or use `npm publish --access public`.*

## How Users Will Use It

Once published, users can add the server to their Claude Desktop configuration:

```json
{
  "mcpServers": {
    "binance-futures": {
      "command": "npx",
      "args": ["-y", "@jarjut/binance-futures-mcp"],
      "env": {
        "BINANCE_API_KEY": "your_api_key",
        "BINANCE_API_SECRET": "your_api_secret"
      }
    }
  }
}
```

## Maintenance

### Updating the Server
When you make changes to the code:
1. Increment the version in `package.json` (e.g., `1.0.0` $\rightarrow$ `1.0.1`).
2. Run `bun run build` to recompile.
3. Run `npm publish` to push the new version to the registry.

Users will automatically receive the latest version via `npx -y` unless they pin a specific version.
