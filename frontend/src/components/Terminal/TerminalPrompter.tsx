import { useState, memo } from "react"

import { Flex, FlexProps, Textarea } from "@chakra-ui/react"

import { BlockyPurpleArrow } from "../Common/Icon"
import { randomIntFromInterval } from "./Utils"


interface TerminalPrompterProps extends FlexProps{
  setPrompt: (prompt: string) => void
}

const TerminalPrompter = ({ setPrompt, ...props }: TerminalPrompterProps) => {
  const [currentText, setCurrentText] = useState<string>();
  const [currentPrompt, setCurrentPrompt] = useState<string>(); // Controls value on hit enter
  const [promptFocus, setPromptFocus] = useState<Boolean>(false);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentPrompt(e.target.value);
    setCurrentText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (promptFocus && (e.key === "Enter" || e.key === "Return")) {
      // Notice the `$`, for slice. CurrentPrompt is to register change in this variable
      setPrompt(`${randomIntFromInterval(0, 10000)}$${currentPrompt}`)
      setCurrentText(undefined)
    }
  };


  return (
    <Flex maxH="400px" borderWidth={1} color="white" {...props} >
      <BlockyPurpleArrow m={1} />
      <Textarea
        value={currentText}
        cursor="default"
        onChange={handlePromptChange}
        onKeyDown={(e) => handleKeyDown(e)}
        onFocus={() => setPromptFocus(true)}
        onBlur={() => setPromptFocus(false)}
        autoFocus={true}
        pl={2}
        p={0}
        maxH="auto"
        variant={"unstyled"}
        resize="none" />
    </Flex >
  )
}

export default memo(TerminalPrompter);
