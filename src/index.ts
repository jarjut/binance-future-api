import express, { Request, Response, NextFunction } from 'express';
import client from './binance';
import * as cleaner from './cleaner';

const app = express();
const port = process.env.PORT || 3000;

const handleBinanceError = (res: Response, e: any) => {
  const code = e.code;
  const message = e.message || 'Binance API Error';

  if (code === 'API-ERROR') {
    // Binance API-ERROR can be generic, but we can check the message
    if (message.includes('invalid') || message.includes('parameter')) {
      return res.status(400).json({ error: message });
    }
  }

  if (code === -1003 || message.includes('auth')) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  if (code === -1003 || code === -1102 || message.includes('rate limit')) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  if (code === -1121 || message.includes('precision')) {
    return res.status(400).json({ error: 'Invalid precision or parameter' });
  }

  // Default Binance gateway errors to 502, others to 500
  const status = code ? 502 : 500;
  return res.status(status).json({ error: message });
};

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!process.env.BINANCE_API_KEY || !process.env.BINANCE_API_SECRET) {
    return res.status(401).json({ error: "API credentials missing in .env" });
  }
  next();
};

app.use(checkAuth);

app.get('/account/balance', async (req: Request, res: Response) => {
  try {
    const balance = await client.futuresAccountInformation();
    const assets = balance.assets;
    res.json(cleaner.cleanBalance(assets));
  } catch (e) {
    handleBinanceError(res, e);
  }
});

app.get('/account/pnl', async (req: Request, res: Response) => {
  try {
    const account = await client.futuresAccountInformation();
    res.json(cleaner.cleanPnL(account));
  } catch (e) {
    handleBinanceError(res, e);
  }
});

app.get('/account/positions', async (req: Request, res: Response) => {
  try {
    const account = await client.futuresAccountInformation();
    const positions = account.assets.filter((a: any) => parseFloat(a.positionAmt) !== 0);
    res.json(cleaner.cleanPositions(positions));
  } catch (e) {
    handleBinanceError(res, e);
  }
});

app.get('/account/open-orders', async (req: Request, res: Response) => {
  try {
    const orders = await client.futuresOpenOrders();
    res.json(cleaner.cleanOpenOrders(orders));
  } catch (e) {
    handleBinanceError(res, e);
  }
});

app.get('/account/trade-history', async (req: Request, res: Response) => {
  try {
    const symbol = req.query.symbol;
    if (typeof symbol !== 'string') {
      return res.status(400).json({ error: "Query parameter 'symbol' is required and must be a string" });
    }
    const trades = await client.futuresUserTrades({ symbol });
    res.json(cleaner.cleanTradeHistory(trades));
  } catch (e) {
    handleBinanceError(res, e);
  }
});

// General error handler for 500s
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
