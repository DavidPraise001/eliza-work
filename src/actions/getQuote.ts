import { Action, IAgentRuntime, Memory, State, HandlerCallback, QuoteResponse } from '../types.js';

// Quotable API service
class QuotableService {
  private baseUrl = 'https://api.quotable.io';

  async getRandomQuote(): Promise<QuoteResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/random`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching quote:', error);
      throw error;
    }
  }

  async getQuoteByAuthor(author: string): Promise<QuoteResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/random?author=${encodeURIComponent(author)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching quote by author:', error);
      throw error;
    }
  }

  async getQuoteByTag(tag: string): Promise<QuoteResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/random?tags=${encodeURIComponent(tag)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching quote by tag:', error);
      throw error;
    }
  }
}

const quotableService = new QuotableService();

export const getQuoteAction: Action = {
  name: 'GET_QUOTE',
  description: 'Fetches inspirational quotes from various authors and topics',
  
  validate: async (runtime: IAgentRuntime, message: Memory, state?: State): Promise<boolean> => {
    const text = message.content.text.toLowerCase();
    return text.includes('quote') || 
           text.includes('inspiration') || 
           text.includes('motivat') ||
           text.includes('wisdom') ||
           text.includes('saying');
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options?: any,
    callback?: HandlerCallback
  ): Promise<boolean> => {
    try {
      const text = message.content.text.toLowerCase();
      let quote: QuoteResponse;

      // Check if user requested a specific author
      const authorMatch = text.match(/(?:quote (?:by|from)|author) ([a-zA-Z\s]+)/i);
      if (authorMatch) {
        const author = authorMatch[1].trim();
        try {
          quote = await quotableService.getQuoteByAuthor(author);
        } catch (error) {
          quote = await quotableService.getRandomQuote();
        }
      }
      // Check if user requested a specific topic/tag
      else if (text.includes('about') || text.includes('on')) {
        const topicMatch = text.match(/(?:about|on) ([a-zA-Z\s]+)/i);
        if (topicMatch) {
          const topic = topicMatch[1].trim();
          try {
            quote = await quotableService.getQuoteByTag(topic);
          } catch (error) {
            quote = await quotableService.getRandomQuote();
          }
        } else {
          quote = await quotableService.getRandomQuote();
        }
      }
      // Default to random quote
      else {
        quote = await quotableService.getRandomQuote();
      }

      const response = {
        text: `"${quote.content}"\n\n— ${quote.author}\n\n🏷️ ${quote.tags.join(', ')}`
      };

      callback?.(response);
      return true;
    } catch (error) {
      console.error('Error in getQuote handler:', error);
      
      const errorResponse = {
        text: "I'm sorry, I couldn't fetch a quote right now. Here's some wisdom instead: 'The best time to plant a tree was 20 years ago. The second best time is now.' — Chinese Proverb"
      };
      
      callback?.(errorResponse);
      return false;
    }
  },

  examples: [
    {
      input: {
        content: { text: 'Give me an inspirational quote' }
      },
      output: {
        text: '"The only way to do great work is to love what you do."\n\n— Steve Jobs\n\n🏷️ inspirational, work'
      }
    },
    {
      input: {
        content: { text: 'Quote by Einstein' }
      },
      output: {
        text: '"Imagination is more important than knowledge."\n\n— Albert Einstein\n\n🏷️ science, imagination'
      }
    },
    {
      input: {
        content: { text: 'I need some motivation' }
      },
      output: {
        text: '"Success is not final, failure is not fatal: it is the courage to continue that counts."\n\n— Winston Churchill\n\n🏷️ motivational, success'
      }
    }
  ]
};