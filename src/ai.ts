// ============================================================
// AI Stack Advisor - AI Engine (Claude API)
// ============================================================
// Centralizes all Claude API interactions. Other modules call
// these functions instead of making direct API calls.
// ============================================================

import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

/**
 * Initializes the Anthropic client.
 * Reads ANTHROPIC_API_KEY from environment.
 */
function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic();
  }
  return client;
}

/**
 * Sends a structured prompt to Claude and returns the text response.
 */
export async function askClaude(
  systemPrompt: string,
  userMessage: string,
  options?: {
    maxTokens?: number;
    temperature?: number;
  }
): Promise<string> {
  const anthropic = getClient();

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: options?.maxTokens ?? 4096,
    temperature: options?.temperature ?? 0.3,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text ?? "";
}

/**
 * Sends a prompt to Claude and parses the response as JSON.
 * Uses low temperature for deterministic structured output.
 */
export async function askClaudeJSON<T>(
  systemPrompt: string,
  userMessage: string
): Promise<T> {
  const response = await askClaude(systemPrompt, userMessage, {
    maxTokens: 4096,
    temperature: 0.1,
  });

  // Extract JSON from response (handle markdown code blocks)
  const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : response.trim();

  return JSON.parse(jsonStr) as T;
}
