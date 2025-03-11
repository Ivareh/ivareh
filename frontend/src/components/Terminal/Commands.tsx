
export const genTextCommands = {
  clear: "",
  bread: "",
  get help() {
    return `\n\nAvailable commands:\n${Object.keys(this).join("\n")}`;
  },
  projects: "",
  aboutme: "I am an enthusiastic programmer who loves to work all around the application! I studied Informatics at NTNU.",
} as Record<string, string>;


export const genContentCommands = new Set(["bread", "projects"])
