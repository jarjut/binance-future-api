import { test, expect } from "bun:test";
import { cleanBalance, cleanPositions, cleanOpenOrders, cleanTradeHistory, cleanPnL } from "../src/cleaner";

test("cleanBalance filters correctly", () => {
  const raw = [{ asset: "USDT", balance: "100.0", available: "100.0", locked: "0.0" }];
  expect(cleanBalance(raw)).toEqual([{ asset: "USDT", balance: "100.0", available: "100.0" }]);
});

test("cleanBalance handles edge cases", () => {
  expect(cleanBalance([])).toEqual([]);
  expect(cleanBalance(null as any)).toEqual([]);
  expect(cleanBalance(undefined as any)).toEqual([]);
  expect(cleanBalance([{}] as any)).toEqual([{ asset: undefined, balance: undefined, available: undefined }]);
});

test("cleanPositions filters correctly", () => {
  const raw = [{ symbol: "BTCUSDT", entryPrice: "50000", markPrice: "51000", amount: "0.1", unrealizedProfit: "10", other: "ignore" }];
  expect(cleanPositions(raw)).toEqual([{ symbol: "BTCUSDT", entryPrice: "50000", markPrice: "51000", amount: "0.1", unrealizedProfit: "10" }]);
});

test("cleanPositions handles edge cases", () => {
  expect(cleanPositions([])).toEqual([]);
  expect(cleanPositions(null as any)).toEqual([]);
  expect(cleanPositions(undefined as any)).toEqual([]);
  expect(cleanPositions([{}] as any)).toEqual([{ symbol: undefined, entryPrice: undefined, markPrice: undefined, amount: undefined, unrealizedProfit: undefined }]);
});

test("cleanOpenOrders filters correctly", () => {
  const raw = [{ symbol: "BTCUSDT", price: "49000", qty: "0.1", side: "BUY", type: "LIMIT", orderId: "123" }];
  expect(cleanOpenOrders(raw)).toEqual([{ symbol: "BTCUSDT", price: "49000", quantity: "0.1", side: "BUY", type: "LIMIT" }]);
});

test("cleanOpenOrders handles edge cases", () => {
  expect(cleanOpenOrders([])).toEqual([]);
  expect(cleanOpenOrders(null as any)).toEqual([]);
  expect(cleanOpenOrders(undefined as any)).toEqual([]);
  expect(cleanOpenOrders([{}] as any)).toEqual([{ symbol: undefined, price: undefined, quantity: undefined, side: undefined, type: undefined }]);
});

test("cleanTradeHistory filters correctly", () => {
  const raw = [{ symbol: "BTCUSDT", price: "50000", qty: "0.1", side: "BUY", time: 123456789, tradeId: "T1" }];
  expect(cleanTradeHistory(raw)).toEqual([{ symbol: "BTCUSDT", price: "50000", quantity: "0.1", side: "BUY", time: 123456789 }]);
});

test("cleanTradeHistory handles edge cases", () => {
  expect(cleanTradeHistory([])).toEqual([]);
  expect(cleanTradeHistory(null as any)).toEqual([]);
  expect(cleanTradeHistory(undefined as any)).toEqual([]);
  expect(cleanTradeHistory([{}] as any)).toEqual([{ symbol: undefined, price: undefined, quantity: undefined, side: undefined, time: undefined }]);
});

test("cleanPnL filters correctly", () => {
  const raw = { totalUnrealizedProfit: "10.5", totalEquity: "110.5", other: "ignore" };
  expect(cleanPnL(raw)).toEqual({ totalUnrealizedProfit: "10.5", totalEquity: "110.5" });
});

test("cleanPnL handles edge cases", () => {
  expect(cleanPnL(null as any)).toEqual({ totalUnrealizedProfit: '0', totalEquity: '0' });
  expect(cleanPnL(undefined as any)).toEqual({ totalUnrealizedProfit: '0', totalEquity: '0' });
  expect(cleanPnL({})).toEqual({ totalUnrealizedProfit: undefined, totalEquity: undefined });
});
