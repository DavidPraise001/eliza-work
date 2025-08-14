# ElizaOS Quotes Plugin 📜

A simple, working ElizaOS plugin that provides inspirational quotes from various authors and topics using the free Quotable API.

## Features

- 🎯 **Smart Quote Detection**: Automatically detects when users are asking for quotes, inspiration, motivation, or wisdom
- 👤 **Author-Specific Quotes**: Request quotes from specific authors (e.g., "Quote by Einstein")
- 🏷️ **Topic-Based Quotes**: Get quotes about specific topics (e.g., "Quote about success")
- 🎲 **Random Quotes**: Fallback to random inspirational quotes
- 🛡️ **Error Handling**: Graceful fallbacks when API calls fail
- ✨ **Beautiful Formatting**: Well-formatted responses with author attribution and tags

## Installation

1. **Prerequisites**: Ensure you have Node.js (version 18+) and npm/pnpm installed.

2. **Clone and install**:
   ```bash
   git clone <repository-url>
   cd eliza-quotes-plugin
   npm install
   ```

3. **Build the plugin**:
   ```bash
   npm run build
   ```

## Usage

### Integration with ElizaOS

```typescript
import { quotesPlugin } from './eliza-quotes-plugin';

// Add to your character configuration
export const character: Character = {
  name: 'MyAgent',
  plugins: [
    '@elizaos/plugin-bootstrap',
    quotesPlugin, // Add the quotes plugin
  ],
  // ... rest of your character config
};
```

### User Interactions

The plugin responds to various quote-related requests:

| User Input | Plugin Response |
|------------|----------------|
| "Give me a quote" | Returns a random inspirational quote |
| "Quote by Einstein" | Returns a quote from Albert Einstein |
| "I need some motivation" | Returns a motivational quote |
| "Quote about success" | Returns a quote related to success |
| "Share some wisdom" | Returns a wisdom-related quote |

### Example Responses

```
"The only way to do great work is to love what you do."

— Steve Jobs

🏷️ inspirational, work
```

## API Reference

### Plugin Structure

```typescript
export const quotesPlugin: Plugin = {
  name: 'quotes-plugin',
  description: 'Provides inspirational quotes using the Quotable API',
  actions: [getQuoteAction],
  // ... other plugin properties
};
```

### Action: GET_QUOTE

- **Name**: `GET_QUOTE`
- **Description**: Fetches inspirational quotes from various authors and topics
- **Validation**: Triggers on keywords like "quote", "inspiration", "motivation", "wisdom", "saying"
- **Handler**: Supports author-specific, topic-specific, and random quote requests

## Development

### Project Structure

```
src/
├── actions/
│   └── getQuote.ts      # Main quote-fetching action
├── types.ts             # TypeScript interfaces
├── index.ts             # Plugin entry point
└── test.ts              # Test suite
```

### Testing

Run the built-in test suite:

```bash
npm run build
npm test
```

This will test:
- Plugin initialization
- Action validation for different message types
- Quote fetching from the Quotable API
- Error handling and fallbacks

### Building

```bash
npm run build
```

Builds TypeScript to JavaScript in the `dist/` directory.

## API Integration

This plugin uses the [Quotable API](https://quotable.io/) which provides:

- ✅ **Free to use** - No API key required
- ✅ **No rate limits** for reasonable usage
- ✅ **Rich metadata** - Author, tags, length, etc.
- ✅ **Multiple endpoints** - Random, author-specific, topic-specific

### Endpoints Used

- `GET https://api.quotable.io/random` - Random quote
- `GET https://api.quotable.io/random?author={author}` - Quote by specific author
- `GET https://api.quotable.io/random?tags={tag}` - Quote by topic/tag

## Plugin Configuration

The plugin includes an `agentConfig` section in `package.json`:

```json
{
  "agentConfig": {
    "actions": ["GET_QUOTE"],
    "providers": [],
    "evaluators": [],
    "models": ["gpt-4", "gpt-3.5-turbo", "claude-3"],
    "services": []
  }
}
```

## Error Handling

The plugin includes robust error handling:

1. **API Failures**: Falls back to offline quotes when the API is unavailable
2. **Invalid Authors**: Defaults to random quotes if the specified author isn't found
3. **Network Issues**: Provides graceful error messages to users
4. **Validation**: Only triggers on relevant user inputs

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Credits

- Built for [ElizaOS](https://github.com/elizaOS/eliza)
- Quotes provided by [Quotable API](https://quotable.io/)
- Developed following the [ElizaOS Plugin Developer Guide](https://eliza.how/guides/plugin-developer-guide)

---

🎉 **Ready to inspire!** This plugin demonstrates the power and simplicity of ElizaOS plugin development.