---
name: Binance Futures Simple API
description: A simple Express.js API using Bun to access Binance Futures account data.
type: design
date: 2026-04-23
---

# Design Spec: Binance Futures Simple API

## 1. Overview
The goal is to create a lightweight API wrapper around the Binance Futures API to easily monitor account balance, PNL, positions, open orders, and trade history.

## 2. Tech Stack
- **Runtime**: Bun
- **Framework**: Express.js
- **Binance Integration**: `binance-api-node` SDK
- **Env Management**: `dotenv` (via Bun's built-in `.env` support)

## 3. Architecture
The application will be a single-service architecture.

### Project Structure
```text
binance-futures-api/
├── .env                # API_KEY, API_SECRET
├── index.ts            # Server, SDK init, and Routes
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

## 4. API Endpoints

All endpoints will return a "Cleaned Response" focusing on essential fields.

| Endpoint | Method | Purpose | Cleaned Fields |
| :--- | :--- | :--- | :--- |
| `/account/balance` | GET | Wallet Balance | `asset`, `balance`, `available` |
| `/account/pnl` | GET | Unrealized PNL | `totalUnrealizedProfit`, `totalEquity` |
| `/account/positions` | GET | Open Positions | `symbol`, `entryPrice`, `markPrice`, `amount`, `unrealizedProfit` |
| `/account/open-orders` | GET | Pending Orders | `symbol`, `price`, `quantity`, `side`, `type` |
| `/account/trade-history` | GET | Trade History | `symbol`, `price`, `quantity`, `side`, `time` |

## 5. Data Flow
1. Client sends GET request to Express endpoint.
2. Express route invokes the corresponding method from `binance-api-node` SDK.
3. SDK communicates with Binance Futures API using HMAC SHA256 signed requests.
4. The raw response is passed through a cleaning function to remove boilerplate Binance fields.
5. Cleaned JSON is returned to the client.

## 6. Error Handling
- **401 Unauthorized**: Returned when API credentials are missing or invalid.
- **502 Bad Gateway**: Returned when the Binance API returns a business-logic error or rate limit.
- **500 Internal Server Error**: Returned for unexpected runtime exceptions.

## 7. Success Criteria
- API successfully authenticates with Binance.
- Each endpoint returns the requested cleaned data.
- Server starts and runs using `bun run index.ts`.
