/* Stores users prompts globally from component TerminalInput.tsx
 *
 */

import { create } from "zustand";
import { TermPromptState } from "./StateInterface";

export const useTermPromptState = create<TermPromptState>((set) => ({
  curProcessingPrompt: false,
  latestPrompt: null,


  setCurProcessingPrompt: (state: boolean) =>
    set(() => {
      console.log(state)
      return {
        curProcessingPrompt: state,

      }
    }),

  setLatestPrompt: (prompt: string | null) =>
    set(() => ({
      latestPrompt: prompt,
    })),




}))
