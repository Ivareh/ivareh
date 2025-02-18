


const commands = {
  clear: "",
  get help() {
    return `\n\nAvailable commands:\n${Object.keys(this).join("\n")}`;
  },
} as Record<string, string>;



export default commands
