# Binance Futures API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a simple Express.js API using Bun and `binance-api-node` to provide cleaned account data from Binance Futures.

**Architecture:** A thin API wrapper using a Service-like structure. The `binance-api-node` SDK handles the API communication, and a dedicated cleaning utility transforms raw Binance responses into the requested minimal format.

**Tech Stack:** Bun, Express.js, `binance-api-node`, TypeScript.

---

## File Map
- Create: `.env` (Template for credentials)
- Create: `package.json` (Dependencies)
- Create: `tsconfig.json` (Bun TS config)
- Create: `src/binance.ts` (SDK initialization and client export)
- Create: `src/cleaner.ts` (Logic to filter Binance raw data into cleaned formats)
- Create: `tests/cleaner.test.ts` (Unit tests for the cleaning logic)
- Create: `index.ts` (Express server and API route handlers)

---

### Task 1: Project Initialization

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.env`

- [ ] **Step 1: Create `package.json`**
```json
{
  "name": "binance-futures-api",
  "version": "1.0.0",
  "main": "index.ts",
  "dependencies": {
    "express": "^4.18.2",
    "binance-api-node": "^1.3.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "bun-types": "latest"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**
```json
{
  "compilerOptions": {
    "lib": ["ESNext"],
    "module": "ESNext",
    "target": "ESNext",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "composite": true,
    "strict": true,
    "downlevelIteration": true,
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "allowJs": true,
    "types": ["bun-types"]
  }
}
```

- [ ] **Step 3: Create `.env` template**
```text
BINANCE_API_KEY=your_api_key_here
BINANCE_API_SECRET=your_api_secret_here
```

- [ ] **Step 4: Install dependencies**
Run: `bun install`

- [ ] **Step 5: Commit**
```bash
git add package.json tsconfig.json .env
git commit -m "chore: initialize project and dependencies"
```

---

### Task 2: SDK Setup & Cleaning Logic (TDD)

**Files:**
- Create: `src/binance.ts`
- Create: `src/cleaner.ts`
- Create: `tests/cleaner.test.ts`

- [ ] **Step 1: Create `src/binance.ts`**
```typescript
import Binance from 'binance-api-node';

const client = new Binance().options({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
});

export default client;
```

- [ ] **Step 2: Write failing tests for cleaning logic in `tests/cleaner.test.ts`**
```typescript
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
```

- [ ] **Step 3: Run tests to verify failure**
Run: `bun test tests/cleaner.test.ts`
Expected: FAIL (functions not defined)

- [ ] **Step 4: Implement `src/cleaner.ts`**
```typescript
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
```

- [ ] **Step 5: Run tests to verify success**
Run: `bun test tests/cleaner.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**
```bash
git add src/binance.ts src/cleaner.ts tests/cleaner.test.ts
git commit -m "feat: implement binance client and cleaning logic"
```

---

### Task 3: API Server Implementation

**Files:**
- Create: `index.ts`

- [ ] **Step 1: Implement basic Express server and auth check in `index.ts`**
```typescript
import express from 'express';
import client from './src/binance';
import * as cleaner from './src/cleaner';

const app = express();
const port = 3000;

const checkAuth = (req: any, res: any, next: any) => {
  if (!process.env.BINANCE_API_KEY || !process.env.BINANCE_API_SECRET) {
    return res.status(401).json({ error: "API credentials missing in .env" });
  }
  next();
};

app.use(checkAuth);
```

- [ ] **Step 2: Implement `/account/balance` route**
```typescript
app.get('/account/balance', async (req, res) => {
  try {
    const balance = await client.futuresAccountInformation();
    const assets = balance.assets;
    res.json(cleaner.cleanBalance(assets));
  } catch (e: any) {
    res.status(502).json({ error: e.message });
  }
});
```

- [ ] **Step 3: Implement `/account/pnl` route**
```typescript
app.get('/account/pnl', async (req, res) => {
  try {
    const account = await client.futuresAccountInformation();
    res.json(cleaner.cleanPnL(account));
  } catch (e: any) {
    res.status(502).json({ error: e.message });
  }
});
```

- [ ] **Step 4: Implement `/account/positions` route**
```typescript
app.get('/account/positions', async (req, res) => {
  try {
    const account = await client.futuresAccountInformation();
    const positions = account.assets.filter((a: any) => parseFloat(a.positionAmt) !== 0);
    res.json(cleaner.cleanPositions(positions));
  } catch (e: any) {
    res.status(502).json({ error: e.message });
  }
});
```

- [ ] **Step 5: Implement `/account/open-orders` route**
```typescript
app.get('/account/open-orders', async (req, res) => {
  try {
    const orders = await client.futuresOpenOrders();
    res.json(cleaner.cleanOpenOrders(orders));
  } catch (e: any) {
    res.status(502).json({ error: e.message });
  }
});
```

- [ ] **Step 6: Implement `/account/trade-history` route**
```typescript
app.get('/account/trade-history', async (req, res) => {
  try {
    // Note: trade history often requires a symbol. 
    // For a general "simple" API, we'll try to fetch the most recent trades.
    // Binance SDK might require symbol; if so, we'll return an error asking for ?symbol=
    const symbol = req.query.symbol as string;
    if (!symbol) return res.status(400).json({ error: "Query parameter 'symbol' is required" });
    
    const trades = await client.futuresUserTrades({ symbol });
    res.json(cleaner.cleanTradeHistory(trades));
  } catch (e: any) {
    res.status(502).json({ error: e.message });
  }
});
```

- [ ] **Step 7: Complete server startup and commit**
```typescript
app.listen(port, () => {
  console.log(`Binance Futures API running at http://localhost:${port}`);
});
```
```bash
git add index.ts
git commit -m "feat: implement API endpoints with cleaned responses"
```

---

### Task 4: Verification

- [ ] **Step 1: Start server**
Run: `bun run index.ts`

- [ ] **Step 2: Verify endpoints via curl**
- Balance: `curl http://localhost:3000/account/balance`
- PNL: `curl http://localhost:3000/account/pnl`
- Positions: `curl http://localhost:3000/account/positions`
- Open Orders: `curl http://localhost:3000/account/open-orders`
- History: `curl http://localhost:3000/account/trade-history?symbol=BTCUSDT`

- [ ] **Step 3: Commit final state**
```bash
git commit -m "chore: final verification"
```
