# binance-futures-api

Minimal TypeScript project for experimenting with the Binance Futures API.

## Setup

Install dependencies:

```bash
npm install
```

## Run

This project is written in TypeScript. You can run it in two common ways:

- Run directly (requires `ts-node` or `tsx`):

```bash
npx ts-node index.ts
# or
npx tsx index.ts
```

- Compile then run:

```bash
npx tsc
node dist/index.js
```

## Tests

There are test files under `tests/`. No test runner is configured in `package.json` — add a test runner (e.g., Jest or Vitest) and a `test` script to `package.json` if you want to run tests.

## Notes

- Created `.gitignore` with common Node/TypeScript ignores.
- Project has no `scripts` defined in `package.json`; you can add `start`, `dev`, and `test` scripts as needed.
