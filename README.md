# @jarjut/binance-futures-mcp

Minimal TypeScript project for experimenting with the Binance Futures API.

## Setup

Install dependencies:

```bash
bun install
```

## Local MCP Server

This project implements a Model Context Protocol (MCP) server that allows AI agents (like Claude Desktop) to interact with your Binance Futures account.

### Available Tools

| Tool | Description | Arguments |
| :--- | :--- | :--- |
| `get_account_balance` | Get the current futures account balances for all assets. | None |
| `get_account_pnl` | Get the total unrealized profit and total equity for the futures account. | None |
| `get_account_positions` | Get all open futures positions with entry and mark prices. | None |
| `get_open_orders` | Get all currently open futures orders. | None |
| `get_trade_history` | Get the trade history for a specific trading pair. | `symbol` (e.g., "BTCUSDT") |

### Installation via NPX (Recommended)

To use this server without cloning the repository, you can run it directly via `npx` (assuming it is published to npm):

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

**Note:** You can use either `BINANCE_API_SECRET` or `BINANCE_PRIVATE_KEY`. At least one must be provided.

### Local Development Configuration

If you have cloned the repo, add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "binance-futures": {
      "command": "bun",
      "args": ["run", "mcp"],
      "env": {
        "BINANCE_API_KEY": "your_api_key",
        "BINANCE_API_SECRET": "your_api_secret"
      }
    }
  }
}
```

**Note:** You can use either `BINANCE_API_SECRET` or `BINANCE_PRIVATE_KEY`. At least one must be provided.

### Running Manually

You can run the MCP server in stdio mode for testing:

```bash
bun run mcp
```

## REST API

The project also includes a simple Express server for REST access.

- Run in development mode: `bun run dev`
- Build and start: `bun run build && bun run start`

## Tests

There are test files under `tests/`. Use `bun test` to run them.

## Notes

- This project uses **Bun** as the primary runtime and package manager.
- `BINANCE_API_KEY` is always required.
- Either `BINANCE_API_SECRET` or `BINANCE_PRIVATE_KEY` (or both) must be set in your environment.
