export const cleanBalance = (data: any[]) =>
  data.map(i => ({ asset: i.asset, balance: i.balance, available: i.available }));

export const cleanPositions = (data: any[]) =>
  data.map(i => ({
    symbol: i.symbol,
    entryPrice: i.entryPrice,
    markPrice: i.markPrice,
    amount: i.amount,
    unrealizedProfit: i.unrealizedProfit
  }));

export const cleanOpenOrders = (data: any[]) =>
  data.map(i => ({
    symbol: i.symbol,
    price: i.price,
    quantity: i.qty,
    side: i.side,
    type: i.type
  }));

export const cleanTradeHistory = (data: any[]) =>
  data.map(i => ({
    symbol: i.symbol,
    price: i.price,
    quantity: i.qty,
    side: i.side,
    time: i.time
  }));

export const cleanPnL = (data: any) => ({
  totalUnrealizedProfit: data.totalUnrealizedProfit,
  totalEquity: data.totalEquity
});
