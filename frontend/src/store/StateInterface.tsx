export interface TermPromptState {
  curProcessingPrompt: boolean;
  latestPrompt: string | null;
  setCurProcessingPrompt: (state: boolean) => void;
  setLatestPrompt: (prompt: string | null) => void;
}

