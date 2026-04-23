import Binance from "binance-api-node";

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET;

if (!apiKey || !apiSecret) {
	throw new Error(
		"Missing required environment variables: BINANCE_API_KEY and BINANCE_API_SECRET must be defined.",
	);
}

const client = Binance({
	apiKey,
	apiSecret,
});

export default client;
