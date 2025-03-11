import { extendTheme } from "@chakra-ui/react"
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/source-code-pro'
import '@fontsource-variable/inconsolata'

const theme = extendTheme({
  fonts: {
    heading: `'Inconsolata Variable'`,
    body: `'Source Code Pro Variable', 'JetBrains Mono Variable', monospace`
  },
  colors: {
    ui: {
      main: "#222727",
      plain: "#e8e9e9",
      blueOutput: "#1e91e2",
      purplearrow: "#897abb",
      tmuxBorder: "#727aa3",
      success: "#17b21a",
      error: "#b9392c",
    },
  },
})

export default theme
