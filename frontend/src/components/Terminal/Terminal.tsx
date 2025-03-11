import { useState, useEffect, useReducer, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import { Box } from "@chakra-ui/react"
import TerminalPrompter from "./TerminalPrompter"
import LoadAnimatedText, { Text } from "../Terminal/Animation/LoadAnimatedText"
import LoadBread from "../Terminal/Animation/Load/LoadBread"
import LoadProjects from "../Terminal/Animation/Load/LoadProjects"
import { genTextCommands, genContentCommands } from "../Terminal/Commands"

type State = { [key: string]: boolean };
type Action = { key: string; load: boolean };

const getContentReducer = (state: State, action: Action): State => {
  switch (action.key) {
    case "reset":
      return {} as State
    default:
      return { ...state, [action.key]: action.load };
  }
};

const Terminal = () => {
  const introTexts: Text[] = [{
    text: `Hello, I am Ivar.
Welcome to my terminal.

----------------
`, duration: 0.08, stagger: 0.07
  },
  { text: `Need help? Type 'help' and hit ENTER or RETURN`, duration: 0.00001, stagger: 0 }
  ]

  const [contentState, dispatch] = useReducer(getContentReducer, {} as State);
  const commandNotFound = (prompt: string) => `command not found: ${prompt}`
  const [textsToGen, setTextsToGen] = useState<Text[]>(introTexts)
  const termAnimTextContainer = useRef<HTMLDivElement>(null)
  const [processingPrompt, setProcessingPrompt] = useState<boolean>()
  const [prompt, setPrompt] = useState<string>()
  const [termKey, setTermKey] = useState<string>()

  // Scroll to bottom whenever texts or content state changes
  useEffect(() => {
    const container = termAnimTextContainer.current
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [textsToGen, contentState]) // Depend on both content changes

  useEffect(() => {
    if (prompt) {
      const latestPrompt = prompt.split(/\$(.*)/s)[1]
      const genText = latestPrompt in genTextCommands

      if (genContentCommands.has(latestPrompt)) {
        dispatch({ key: "reset", load: false })
        dispatch({ key: latestPrompt, load: true })
      }

      if (!genText) {
        const commandNotFoundMsg = commandNotFound(latestPrompt)
        setTextsToGen((prev) => [...prev, { text: commandNotFoundMsg, duration: 0.00001, stagger: 0 }])
        return
      }

      if (genText) {
        setTextsToGen((prev) => [...prev, { text: genTextCommands[latestPrompt], duration: 0.00001, stagger: 0 }])
        if (latestPrompt === "clear") {
          dispatch({ key: "reset", load: false })
          setTextsToGen([{ text: "", duration: 0.00001, stagger: 0 }])
          setTermKey(uuidv4())
        }
      }
    }
  }, [prompt]) // Removed ref from dependencies as it's not needed

  return (
    <Box height="auto" p={1} >
      <Box
        ref={termAnimTextContainer}
        maxH={200}
        overflowY="auto"
        scrollBehavior="smooth"
        color="white"
        flexDirection="column"
        width="100%"
      >
        <LoadAnimatedText setProcessingPrompt={setProcessingPrompt} texts={textsToGen} />
      </Box>
      {<TerminalPrompter
        visibility={processingPrompt ? "hidden" : undefined}
        setPrompt={setPrompt}
        style={{ visibility: processingPrompt ? 'hidden' : 'visible' }}
        key={termKey + "tp"}
        mb="1rem"
      />
      }
      {contentState["bread"] && <LoadBread setProcessingPrompt={setProcessingPrompt} />}
      {contentState["projects"] && <LoadProjects setProcessingPrompt={setProcessingPrompt} />}
    </Box>
  )
}

export default Terminal
