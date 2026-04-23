export interface RawBalance {
	asset: string;
	balance: string;
	available: string;
	[key: string]: any;
}

export interface CleanBalance {
	asset: string | undefined;
	balance: string | undefined;
	available: string | undefined;
}

export interface RawPosition {
	symbol: string;
	entryPrice: string;
	markPrice: string;
	amount: string;
	unrealizedProfit: string;
	[key: string]: any;
}

export interface CleanPosition {
	symbol: string | undefined;
	entryPrice: string | undefined;
	markPrice: string | undefined;
	amount: string | undefined;
	unrealizedProfit: string | undefined;
}

export interface RawOrder {
	symbol: string;
	price: string;
	origQty: string;
	side: string;
	type: string;
	[key: string]: any;
}

export interface CleanOrder {
	symbol: string | undefined;
	price: string | undefined;
	quantity: string | undefined;
	side: string | undefined;
	type: string | undefined;
}

export interface RawTrade {
	symbol: string;
	price: string;
	qty: string;
	side: string;
	time: number;
	[key: string]: any;
}

export interface CleanTrade {
	symbol: string | undefined;
	price: string | undefined;
	quantity: string | undefined;
	side: string | undefined;
	time: number | undefined;
}

export interface RawPnL {
	totalUnrealizedProfit: string;
	totalEquity: string;
	[key: string]: any;
}

export interface CleanPnL {
	totalUnrealizedProfit: string | undefined;
	totalEquity: string | undefined;
}

export const cleanBalance = (data: RawBalance[]): CleanBalance[] => {
	if (!Array.isArray(data)) return [];
	return data.map((i) => ({
		asset: i.asset,
		balance: i.balance,
		available: i.available,
	}));
};

export const cleanPositions = (data: RawPosition[]): CleanPosition[] => {
	if (!Array.isArray(data)) return [];
	return data.map((i) => ({
		symbol: i.symbol,
		entryPrice: i.entryPrice,
		markPrice: i.markPrice,
		amount: i.amount,
		unrealizedProfit: i.unrealizedProfit,
	}));
};

export const cleanOpenOrders = (data: RawOrder[]): CleanOrder[] => {
	if (!Array.isArray(data)) return [];
	return data.map((i) => ({
		symbol: i.symbol,
		price: i.price,
		quantity: i.origQty,
		side: i.side,
		type: i.type,
	}));
};

export const cleanTradeHistory = (data: RawTrade[]): CleanTrade[] => {
	if (!Array.isArray(data)) return [];
	return data.map((i) => ({
		symbol: i.symbol,
		price: i.price,
		quantity: i.qty,
		side: i.side,
		time: i.time,
	}));
};

export const cleanPnL = (data: RawPnL): CleanPnL => {
	if (!data) return { totalUnrealizedProfit: "0", totalEquity: "0" };
	return {
		totalUnrealizedProfit: data.totalUnrealizedProfit,
		totalEquity: data.totalEquity,
	};
};
