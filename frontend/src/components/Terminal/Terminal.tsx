import { useState, useEffect } from "react"

import { Grid } from "@chakra-ui/react"

import TerminalPrompter from "./TerminalPrompter"
import LoadAnimatedText, { Text } from "../Common/LoadAnimatedText"
import commands from "../Terminal/Commands"
import { useTermPromptState } from "../../store/TermPromptState"

const Terminal = () => {

  const { curProcessingPrompt, latestPrompt } = useTermPromptState();

  const introTexts: Text[] = [{
    text: `Hello, I am Ivar.
Welcome to my terminal.

----------------
`, speed: "slow"
  },
  { text: `Need help? Type 'help' and hit ENTER or RETURN`, speed: "fast" },
  ]

  const commandNotFound = (prompt: string) => `command not found: ${prompt}`

  const [textsToGen, setTextsToGen] = useState<Text[]>(introTexts)

  useEffect(() => {
    if (latestPrompt) {
      const latestPromptWoCount = latestPrompt.split(/\$(.*)/s)[1]

      if (!(commands.has(latestPromptWoCount))) {
        const commandNotFoundMsg = commandNotFound(latestPromptWoCount)
        setTextsToGen((prev) => [...prev, { text: commandNotFoundMsg, speed: "fast" }])
        return
      }

      setTextsToGen((prev) => [...prev, { text: `\n\n Available commands: \n ${Array.from(commands).join("\n")}`, speed: "fast" }])
    }
  }, [latestPrompt])

  return (
    <Grid p={1} borderColor="ui.tmuxBorder" borderWidth={"1px"} >
      <LoadAnimatedText texts={textsToGen} />
      {!curProcessingPrompt &&
        <TerminalPrompter />
      }
    </Grid>
  )
}

export default Terminal
