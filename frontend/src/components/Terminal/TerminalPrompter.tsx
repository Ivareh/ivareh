import { useState, memo, useRef, useEffect } from "react"

import { Flex, FlexProps, Textarea } from "@chakra-ui/react"

import { BlockyPurpleArrow } from "../Common/Icon"
import { randomIntFromInterval } from "./Utils"


interface TerminalPrompterProps extends FlexProps {
  setPrompt: (prompt: string) => void
}

const TerminalPrompter = ({ setPrompt, ...props }: TerminalPrompterProps) => {
  const [currentText, setCurrentText] = useState<string>();
  const [currentPrompt, setCurrentPrompt] = useState<string>(); // Controls value on hit enter
  const [promptFocus, setPromptFocus] = useState<Boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentPrompt(e.target.value);
    setCurrentText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (promptFocus && (e.key === "Enter" || e.key === "Return")) {
      // Notice the `$`, for slice. CurrentPrompt registers change in this variable
      setPrompt(`${randomIntFromInterval(0, 10000)}$${currentPrompt}`)
      e.preventDefault()
      setCurrentText("")

      if (textAreaRef.current) {
        textAreaRef.current.focus()
      }
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [textAreaRef.current])



  return (
    <Flex maxH="400px" borderWidth={1} color="white" {...props} >
      <BlockyPurpleArrow m={1} />
      <Textarea
        ref={textAreaRef}
        value={currentText}
        cursor="default"
        onChange={handlePromptChange}
        onKeyDown={(e) => handleKeyDown(e)}
        onFocus={() => setPromptFocus(true)}
        onBlur={() => setPromptFocus(false)}
        pl={2}
        p={0}
        maxH="auto"
        variant={"unstyled"}
        resize="none" />
    </Flex >
  )
}

export default TerminalPrompter;
