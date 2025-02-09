export interface TermPromptState {
  latestPrompt: string | null;
  setLatestPrompt: (prompt: string | null) => void;
}

