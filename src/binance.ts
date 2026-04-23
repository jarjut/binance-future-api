import Binance from 'binance-api-node';

const client = new Binance().options({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
});

export default client;
