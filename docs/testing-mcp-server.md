# Testing the MCP stdio Server

This guide explains how to test and debug Model Context Protocol (MCP) servers that use the `stdio` transport.

## Transport Basics
MCP `stdio` servers communicate using JSON-RPC over standard input (`stdin`) and standard output (`stdout`). 

**CRITICAL:** Because `stdout` is used for the protocol, you must **never** use `console.log()` for debugging. Always use `console.error()` to send logs to the stderr stream, which the client will either ignore or capture as logs.

---

## Testing Methods

### 1. Using the MCP Inspector (Recommended)
The MCP Inspector is a specialized developer tool that provides a web-based GUI to interact with your server without needing a full LLM client.

**How to run:**
```bash
npx @modelcontextprotocol/inspector <server-start-command>
```

**Example:**
```bash
npx @modelcontextprotocol/inspector node build/index.js
```

Once launched, follow the URL provided in the terminal (usually `http://localhost:5173`) to:
- List and call tools.
- Inspect available resources.
- Test prompts.
- View the raw JSON-RPC traffic.

### 2. Manual CLI Testing
You can test the server by running it directly in your terminal and manually pasting JSON-RPC requests.

1. Start the server: `node build/index.js`
2. Paste the following request and press Enter:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "listTools",
  "params": {}
}
```
3. The server should respond with a JSON object containing the available tools.

### 3. Programmatic Testing
For automated testing (e.g., with Vitest or Jest), spawn the server as a child process.

```typescript
import { spawn } from 'child_process';

const server = spawn('node', ['build/index.js']);

// Send a request
server.stdin.write(JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'listTools',
  params: {}
}) + '\n');

// Capture the response
server.stdout.on('data', (data) => {
  console.log('Server response:', data.toString());
});
```

---

## Common Troubleshooting
- **Server hangs or crashes on start**: Check `stderr` logs. If you are using a build step, ensure you are pointing to the compiled JS file, not the TS source.
- **Client reports "Invalid JSON"**: This usually means your server is printing non-JSON text to `stdout`. Search your codebase for `console.log` and replace them with `console.error`.
- **Timeout errors**: Ensure your server is not performing a blocking operation that prevents it from responding to the `initialize` request.
