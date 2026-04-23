import { test, expect } from "bun:test";
import { cleanBalance, cleanPositions, cleanOpenOrders, cleanTradeHistory, cleanPnL } from "../src/cleaner";

test("cleanBalance filters correctly", () => {
  const raw = [{ asset: "USDT", balance: "100.0", available: "100.0", locked: "0.0" }];
  expect(cleanBalance(raw)).toEqual([{ asset: "USDT", balance: "100.0", available: "100.0" }]);
});

test("cleanPositions filters correctly", () => {
  const raw = [{ symbol: "BTCUSDT", entryPrice: "50000", markPrice: "51000", amount: "0.1", unrealizedProfit: "10", other: "ignore" }];
  expect(cleanPositions(raw)).toEqual([{ symbol: "BTCUSDT", entryPrice: "50000", markPrice: "51000", amount: "0.1", unrealizedProfit: "10" }]);
});

test("cleanOpenOrders filters correctly", () => {
  const raw = [{ symbol: "BTCUSDT", price: "49000", qty: "0.1", side: "BUY", type: "LIMIT", orderId: "123" }];
  expect(cleanOpenOrders(raw)).toEqual([{ symbol: "BTCUSDT", price: "49000", quantity: "0.1", side: "BUY", type: "LIMIT" }]);
});

test("cleanTradeHistory filters correctly", () => {
  const raw = [{ symbol: "BTCUSDT", price: "50000", qty: "0.1", side: "BUY", time: 123456789, tradeId: "T1" }];
  expect(cleanTradeHistory(raw)).toEqual([{ symbol: "BTCUSDT", price: "50000", quantity: "0.1", side: "BUY", time: 123456789 }]);
});

test("cleanPnL filters correctly", () => {
  const raw = { totalUnrealizedProfit: "10.5", totalEquity: "110.5", other: "ignore" };
  expect(cleanPnL(raw)).toEqual({ totalUnrealizedProfit: "10.5", totalEquity: "110.5" });
});
