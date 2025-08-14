// Mock types for ElizaOS core interfaces
export interface Memory {
  id?: string;
  userId?: string;
  agentId?: string;
  roomId?: string;
  content: {
    text: string;
    attachments?: any[];
  };
  createdAt?: number;
  updatedAt?: number;
}

export interface State {
  [key: string]: any;
}

export interface IAgentRuntime {
  agentId: string;
  serverUrl?: string;
  token?: string;
  actions?: Action[];
  providers?: Provider[];
  services?: Service[];
  evaluators?: Evaluator[];
}

export interface HandlerCallback {
  (response: { text: string; attachments?: any[] }, files?: any[]): void;
}

export interface Action {
  name: string;
  description: string;
  validate: (runtime: IAgentRuntime, message: Memory, state?: State) => Promise<boolean>;
  handler: (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options?: any,
    callback?: HandlerCallback
  ) => Promise<boolean>;
  examples: Array<{
    input: Memory;
    output: { text: string };
  }>;
}

export interface Provider {
  name: string;
  description: string;
  get: (runtime: IAgentRuntime, message: Memory, state?: State) => Promise<string>;
}

export interface Service {
  name: string;
  description: string;
  initialize: (runtime: IAgentRuntime) => Promise<void>;
  cleanup?: (runtime: IAgentRuntime) => Promise<void>;
}

export interface Evaluator {
  name: string;
  description: string;
  evaluate: (runtime: IAgentRuntime, message: Memory, state?: State) => Promise<number>;
}

export interface Plugin {
  name: string;
  description: string;
  actions?: Action[];
  providers?: Provider[];
  services?: Service[];
  evaluators?: Evaluator[];
  init?: (config: any, runtime: IAgentRuntime) => Promise<void>;
}

export interface QuoteResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}