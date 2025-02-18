import { useState, useEffect } from "react"
import {v4 as uuidv4} from "uuid"

import { Grid } from "@chakra-ui/react"

import TerminalPrompter from "./TerminalPrompter"
import LoadAnimatedText, { Text } from "../Terminal/Animation/LoadAnimatedText"
import commands from "../Terminal/Commands"

const Terminal = () => {
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

  const [processingPrompt, setProcessingPrompt] = useState<boolean>()
  const [prompt, setPrompt] = useState<string>()
  const [termKey, setTermKey] = useState<string>()

  useEffect(() => {
    if (prompt) {
      const latestPrompt = prompt.split(/\$(.*)/s)[1]

      if (!(latestPrompt in commands)) {
        const commandNotFoundMsg = commandNotFound(latestPrompt)
        setTextsToGen((prev) => [...prev, { text: commandNotFoundMsg, speed: "fast" }])
        return
      }

      setTextsToGen((prev) => [...prev, { text: commands[latestPrompt], speed: "fast" }])
      if (latestPrompt === "clear") {
        setTextsToGen([{text: "", speed: "fast"}])
        setTermKey(uuidv4())
      }
    }
  }, [prompt])

  return (
    <Grid p={1} borderColor="ui.tmuxBorder" borderWidth={"1px"} key={termKey} >
      <LoadAnimatedText setProcessingPrompt={setProcessingPrompt} texts={textsToGen} />
      {!processingPrompt &&
        <TerminalPrompter setPrompt={setPrompt} />
      }
    </Grid>
  )
}

export default Terminal
