const MINIMAX_BASE_URL = "https://api.minimax.io/anthropic/v1";

export interface MiniMaxMessage {
  role: "user" | "assistant";
  content: string;
}

export interface MiniMaxRequest {
  model: string;
  max_tokens: number;
  messages: MiniMaxMessage[];
  temperature?: number;
  thinking?: {
    type: "enabled" | "disabled";
    budget_tokens?: number;
  };
}

export interface MiniMaxResponse {
  id: string;
  type: string;
  role: string;
  model: string;
  content: Array<{
    type: string;
    text?: string;
    thinking?: string;
    signature?: string;
  }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
  stop_reason: string;
  base_resp: {
    status_code: number;
    status_msg: string;
  };
}

export interface MiniMaxError {
  type: string;
  error: {
    type: string;
    message: string;
  };
  request_id?: string;
}

export class MiniMaxAPI {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_MINIMAX_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("MiniMax API key not found. Set VITE_MINIMAX_API_KEY in .env.local");
    }
  }

  async createMessage(request: {
    messages: MiniMaxMessage[];
    max_tokens?: number;
    temperature?: number;
    thinking?: { type: "enabled" | "disabled"; budget_tokens?: number };
  }): Promise<MiniMaxResponse> {
    const response = await fetch(`${MINIMAX_BASE_URL}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify({
        model: "MiniMax-M2.7",
        max_tokens: request.max_tokens || 1024,
        messages: request.messages,
        temperature: request.temperature,
        thinking: request.thinking,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data as MiniMaxError;
      throw new Error(error.error?.message || `API Error: ${response.status}`);
    }

    return data as MiniMaxResponse;
  }

  async chat(
    messages: MiniMaxMessage[],
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<string> {
    const response = await this.createMessage({
      max_tokens: options?.maxTokens || 1024,
      messages,
      temperature: options?.temperature,
    });

    const textContent = response.content.find((c) => c.type === "text");
    return textContent?.text || "";
  }
}

export const minimax = new MiniMaxAPI();
