import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as binanceService from "./binance-service";

const server = new Server(
	{
		name: "binance-futures-mcp",
		version: "1.0.0",
	},
	{
		capabilities: {
			tools: {},
		},
	}
);

const TOOLS = {
	get_account_balance: {
		description: "Get the current futures account balances for all assets.",
		inputSchema: {
			type: "object",
			properties: {},
		},
	},
	get_account_pnl: {
		description: "Get the total unrealized profit and total equity for the futures account.",
		inputSchema: {
			type: "object",
			properties: {},
		},
	},
	get_account_positions: {
		description: "Get all open futures positions.",
		inputSchema: {
			type: "object",
			properties: {},
		},
	},
	get_open_orders: {
		description: "Get all open futures orders.",
		inputSchema: {
			type: "object",
			properties: {},
		},
	},
	get_trade_history: {
		description: "Get the trade history for a specific symbol in futures.",
		inputSchema: {
			type: "object",
			properties: {
				symbol: {
					type: "string",
					description: "The trading pair symbol (e.g., BTCUSDT)",
				},
			},
			required: ["symbol"],
		},
	},
} as const;

server.setRequestHandler(ListToolsRequestSchema, async () => {
	return {
		tools: Object.entries(TOOLS).map(([name, tool]) => ({
			name,
			description: tool.description,
			inputSchema: tool.inputSchema,
		})),
	};
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
	const { name, arguments: args } = request.params;

	try {
		switch (name) {
			case "get_account_balance": {
				const cleaned = await binanceService.getAccountBalance();
				return {
					content: [{ type: "text", text: JSON.stringify(cleaned, null, 2) }],
				};
			}
			case "get_account_pnl": {
				const cleaned = await binanceService.getAccountPnL();
				return {
					content: [{ type: "text", text: JSON.stringify(cleaned, null, 2) }],
				};
			}
			case "get_account_positions": {
				const cleaned = await binanceService.getAccountPositions();
				return {
					content: [{ type: "text", text: JSON.stringify(cleaned, null, 2) }],
				};
			}
			case "get_open_orders": {
				const cleaned = await binanceService.getOpenOrders();
				return {
					content: [{ type: "text", text: JSON.stringify(cleaned, null, 2) }],
				};
			}
			case "get_trade_history": {
				const symbol = args?.symbol as string;
				if (!symbol) {
					throw new Error("Symbol is required for get_trade_history");
				}
				const cleaned = await binanceService.getTradeHistory(symbol);
				return {
					content: [{ type: "text", text: JSON.stringify(cleaned, null, 2) }],
				};
			}
			default:
				throw new Error(`Tool not found: ${name}`);
		}
	} catch (error: any) {
		return {
			content: [{ type: "text", text: `Error executing tool ${name}: ${error.message}` }],
			isError: true,
		};
	}
});

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Binance Futures MCP server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main:", error);
	process.exit(1);
});
