/* Stores users prompts globally from component TerminalInput.tsx
 *
 */

import { create } from "zustand";
import { TermPromptState } from "./StateInterface";

export const useTermPromptState = create<TermPromptState>((set) => ({
  latestPrompt: null,

  setLatestPrompt: (prompt: string | null) =>
    set(() => ({
      latestPrompt: prompt,
    }))


}))
