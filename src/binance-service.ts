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
	if (!account) return { totalUnrealizedProfit: "0", totalEquity: "0" };
	return {
		totalUnrealizedProfit: account.totalUnrealizedProfit,
		totalEquity: account.totalWalletBalance,
	};
};

export const getAccountPositions = async () => {
	const dataPositions = await client.futuresPositionRisk();
	const positions = Array.isArray(dataPositions)
		? dataPositions.filter((p: any) => parseFloat(p.positionAmt) !== 0)
		: [];

	const normalized = positions.map((p: any) => {
		const value = parseFloat(p.notional);
		const leverage = parseFloat(p.leverage);
		const margin = value / leverage;
		const unrealizedProfit = parseFloat(p.unRealizedProfit);

		const ROI = (unrealizedProfit / margin) * 100;

		return {
			symbol: p.symbol,
			positionSide: p.positionSide,
			quantity: p.positionAmt,
			entryPrice: p.entryPrice,
			markPrice: p.markPrice,
			leverage: `${p.leverage}X`,
			value: `${value.toFixed(2)}`,
			margin: `${margin.toFixed(2)}`,
			liquidationPrice: p.liquidationPrice,
			unrealizedProfit: `${unrealizedProfit.toFixed(2)}`,
			ROI: `${ROI.toFixed(2)}%`,
		};
	});

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
