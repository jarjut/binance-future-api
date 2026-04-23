import BinanceLib from "binance-api-node";

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET;

if (!apiKey || !apiSecret) {
	throw new Error(
		"Missing required environment variables: BINANCE_API_KEY and BINANCE_API_SECRET must be defined.",
	);
}

// Handle CJS/ESM interop: Bun's bundler may wrap the default export,
// placing the factory function one level deeper at .default
const BinanceFactory: typeof BinanceLib =
	typeof BinanceLib === "function"
		? BinanceLib
		: (BinanceLib as any).default;

const client = BinanceFactory({
	apiKey,
	apiSecret,
});

export default client;
