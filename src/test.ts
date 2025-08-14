import { quotesPlugin } from './index.js';
import { IAgentRuntime, Memory } from './types.js';

// Mock runtime for testing
const mockRuntime: IAgentRuntime = {
  agentId: 'test-agent',
  serverUrl: 'http://localhost:3000',
  token: 'test-token',
  actions: [],
  providers: [],
  services: [],
  evaluators: []
};

// Test messages
const testMessages: Memory[] = [
  {
    content: { text: 'Give me an inspirational quote' }
  },
  {
    content: { text: 'Quote by Einstein' }
  },
  {
    content: { text: 'I need some motivation' }
  },
  {
    content: { text: 'Quote about success' }
  },
  {
    content: { text: 'Share some wisdom' }
  },
  {
    content: { text: 'Hello there' } // This should not trigger the quote action
  }
];

async function testPlugin() {
  console.log('🧪 Testing ElizaOS Quotes Plugin\n');
  
  // Initialize plugin
  if (quotesPlugin.init) {
    await quotesPlugin.init({}, mockRuntime);
  }
  
  console.log('\n📝 Running Action Tests...\n');
  
  const quoteAction = quotesPlugin.actions?.[0];
  if (!quoteAction) {
    console.error('❌ No quote action found');
    return;
  }
  
  for (const [index, message] of testMessages.entries()) {
    console.log(`Test ${index + 1}: "${message.content.text}"`);
    
    // Test validation
    const isValid = await quoteAction.validate(mockRuntime, message);
    console.log(`  Validation: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    
    if (isValid) {
      // Test handler
      try {
        console.log('  Fetching quote...');
        
        const result = await quoteAction.handler(
          mockRuntime,
          message,
          undefined,
          undefined,
          (response) => {
            console.log('  📜 Response:');
            console.log(`     ${response.text.split('\n').join('\n     ')}`);
          }
        );
        
        console.log(`  Handler result: ${result ? '✅ Success' : '❌ Failed'}`);
      } catch (error) {
        console.error('  ❌ Handler error:', error);
      }
    }
    
    console.log(''); // Empty line for readability
  }
  
  console.log('🎉 Plugin testing completed!');
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testPlugin().catch(console.error);
}

export { testPlugin };