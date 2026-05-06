import client from "./binance";
import * as cleaner from "./cleaner";

export const getAccountBalance = async () => {
	const rawBalances = await client.futuresAccountBalance();
	const assets = Array.isArray(rawBalances)
		? rawBalances.map((b: any) => ({
				asset: b.asset,
				balance: b.walletBalance,
				available: b.availableBalance,
			}))
		: [];
	return cleaner.cleanBalance(assets);
};

export const getAccountPnL = async () => {
	const account = await client.futuresAccountInfo();
	return cleaner.cleanPnL({
		totalUnrealizedProfit: account.totalUnrealizedProfit,
		totalEquity: account.totalWalletBalance,
	});
};

export const getAccountPositions = async () => {
	const account = await client.futuresAccountInfo();
	const positions = Array.isArray(account.positions)
		? account.positions.filter((p: any) => parseFloat(p.positionAmt) !== 0)
		: [];
	const normalized = positions.map((p: any) => ({
		symbol: p.symbol,
		entryPrice: p.entryPrice,
		markPrice: p.markPrice,
		positionSide: p.positionSide,
		leverage: p.leverage,
		margin: `${p.positionInitialMargin} USDT`,
		value: `${p.notional} USDT`,
		quantity: p.positionAmt,
		unrealizedProfit: p.unrealizedProfit,
	}));

	return normalized;
};

export const getOpenOrders = async () => {
	const orders = await client.futuresOpenOrders();
	return cleaner.cleanOpenOrders(orders);
};

export const getTradeHistory = async (symbol: string) => {
	const trades = await client.futuresUserTrades({ symbol });
	return cleaner.cleanTradeHistory(trades);
};
