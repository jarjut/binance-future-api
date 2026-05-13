import BinanceLib, { BinanceRestOptions } from "binance-api-node";

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET;
const privateKey = process.env.BINANCE_PRIVATE_KEY;

if (!apiKey) {
	throw new Error(
		"Missing required environment variable: BINANCE_API_KEY must be defined.",
	);
}

if (!apiSecret && !privateKey) {
	throw new Error(
		"Missing required environment variables: either BINANCE_API_SECRET or BINANCE_PRIVATE_KEY must be defined.",
	);
}

// Handle CJS/ESM interop: Bun's bundler may wrap the default export,
// placing the factory function one level deeper at .default
const BinanceFactory: typeof BinanceLib =
	typeof BinanceLib === "function" ? BinanceLib : (BinanceLib as any).default;

const client = BinanceFactory({
	apiKey,
	apiSecret,
	privateKey,
	recvWindow: 10000, // increase to 10s to tolerate local clock drift
} as BinanceRestOptions);

export default client;
