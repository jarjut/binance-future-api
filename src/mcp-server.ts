import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import packageJson from "../package.json";
import * as binanceService from "./binance-service";

const server = new McpServer({
	name: "binance-futures-mcp",
	version: packageJson.version,
});

server.registerTool(
	"get_account_balance",
	{
		description: "Get the current futures account balances for all assets.",
		inputSchema: z.object({}),
	},
	async () => {
		try {
			const cleaned = await binanceService.getAccountBalance();
			return {
				content: [
					{ type: "text" as const, text: JSON.stringify(cleaned, null, 2) },
				],
			};
		} catch (error: any) {
			return {
				content: [{ type: "text" as const, text: `Error: ${error.message}` }],
				isError: true,
			};
		}
	},
);

server.registerTool(
	"get_account_pnl",
	{
		description:
			"Get the total unrealized profit and total equity for the futures account.",
		inputSchema: z.object({}),
	},
	async () => {
		try {
			const cleaned = await binanceService.getAccountPnL();
			return {
				content: [
					{ type: "text" as const, text: JSON.stringify(cleaned, null, 2) },
				],
			};
		} catch (error: any) {
			return {
				content: [{ type: "text" as const, text: `Error: ${error.message}` }],
				isError: true,
			};
		}
	},
);

server.registerTool(
	"get_account_positions",
	{
		description: "Get all open futures positions.",
		inputSchema: z.object({}),
	},
	async () => {
		try {
			const cleaned = await binanceService.getAccountPositions();
			return {
				content: [
					{ type: "text" as const, text: JSON.stringify(cleaned, null, 2) },
				],
			};
		} catch (error: any) {
			return {
				content: [{ type: "text" as const, text: `Error: ${error.message}` }],
				isError: true,
			};
		}
	},
);

server.registerTool(
	"get_open_orders",
	{
		description: "Get all open futures orders.",
		inputSchema: z.object({}),
	},
	async () => {
		try {
			const cleaned = await binanceService.getOpenOrders();
			return {
				content: [
					{ type: "text" as const, text: JSON.stringify(cleaned, null, 2) },
				],
			};
		} catch (error: any) {
			return {
				content: [{ type: "text" as const, text: `Error: ${error.message}` }],
				isError: true,
			};
		}
	},
);

server.registerTool(
	"get_trade_history",
	{
		description: "Get the trade history for a specific symbol in futures.",
		inputSchema: z.object({
			symbol: z.string().describe("The trading pair symbol (e.g., BTCUSDT)"),
		}),
	},
	async ({ symbol }) => {
		try {
			const cleaned = await binanceService.getTradeHistory(symbol);
			return {
				content: [
					{ type: "text" as const, text: JSON.stringify(cleaned, null, 2) },
				],
			};
		} catch (error: any) {
			return {
				content: [{ type: "text" as const, text: `Error: ${error.message}` }],
				isError: true,
			};
		}
	},
);

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Binance Futures MCP server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main:", error);
	process.exit(1);
});
