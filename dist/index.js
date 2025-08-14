import { getQuoteAction } from './actions/getQuote.js';
export const quotesPlugin = {
    name: 'quotes-plugin',
    description: 'A plugin that provides inspirational quotes from various authors and topics using the Quotable API',
    actions: [getQuoteAction],
    providers: [],
    services: [],
    evaluators: [],
    init: async (config, runtime) => {
        console.log('🎯 Quotes Plugin initialized successfully!');
        console.log('Available actions:', ['GET_QUOTE']);
        console.log('Usage examples:');
        console.log('  - "Give me a quote"');
        console.log('  - "Quote by Einstein"');
        console.log('  - "I need some motivation"');
        console.log('  - "Quote about success"');
    }
};
export default quotesPlugin;
// Export types for consumers
export * from './types.js';
export { getQuoteAction } from './actions/getQuote.js';
//# sourceMappingURL=index.js.map