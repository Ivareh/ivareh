
export const genTextCommands = {
  clear: "",
  bread: "",
  get help() {
    return `\n\nAvailable commands:\n${Object.keys(this).join("\n")}`;
  },
} as Record<string, string>;


export const genContentCommands = new Set(["bread"])
