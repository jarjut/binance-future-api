export interface RawBalance {
  asset: string;
  balance: string;
  available: string;
  [key: string]: any;
}

export interface CleanBalance {
  asset: string;
  balance: string;
  available: string;
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
  symbol: string;
  entryPrice: string;
  markPrice: string;
  amount: string;
  unrealizedProfit: string;
}

export interface RawOrder {
  symbol: string;
  price: string;
  qty: string;
  side: string;
  type: string;
  [key: string]: any;
}

export interface CleanOrder {
  symbol: string;
  price: string;
  quantity: string;
  side: string;
  type: string;
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
  symbol: string;
  price: string;
  quantity: string;
  side: string;
  time: number;
}

export interface RawPnL {
  totalUnrealizedProfit: string;
  totalEquity: string;
  [key: string]: any;
}

export interface CleanPnL {
  totalUnrealizedProfit: string;
  totalEquity: string;
}

export const cleanBalance = (data: RawBalance[]): CleanBalance[] => {
  if (!Array.isArray(data)) return [];
  return data.map(i => ({ asset: i.asset, balance: i.balance, available: i.available }));
};

export const cleanPositions = (data: RawPosition[]): CleanPosition[] => {
  if (!Array.isArray(data)) return [];
  return data.map(i => ({
    symbol: i.symbol,
    entryPrice: i.entryPrice,
    markPrice: i.markPrice,
    amount: i.amount,
    unrealizedProfit: i.unrealizedProfit
  }));
};

export const cleanOpenOrders = (data: RawOrder[]): CleanOrder[] => {
  if (!Array.isArray(data)) return [];
  return data.map(i => ({
    symbol: i.symbol,
    price: i.price,
    quantity: i.qty,
    side: i.side,
    type: i.type
  }));
};

export const cleanTradeHistory = (data: RawTrade[]): CleanTrade[] => {
  if (!Array.isArray(data)) return [];
  return data.map(i => ({
    symbol: i.symbol,
    price: i.price,
    quantity: i.qty,
    side: i.side,
    time: i.time
  }));
};

export const cleanPnL = (data: RawPnL): CleanPnL => {
  if (!data) return { totalUnrealizedProfit: '0', totalEquity: '0' };
  return {
    totalUnrealizedProfit: data.totalUnrealizedProfit,
    totalEquity: data.totalEquity
  };
};
