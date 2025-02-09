import { useState } from "react"

import { Flex, Textarea } from "@chakra-ui/react"

import { BlockyPurpleArrow } from "../Common/Icon"
import { useTermPromptState } from "../../store/TermPromptState"

const TerminalPrompter = () => {
  const [promptCount, setPromptCount] = useState<number>(0);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [promptFocus, setPromptFocus] = useState<Boolean>(false);

  const { setLatestPrompt } = useTermPromptState();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentPrompt(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (promptFocus && (e.key === "Enter" || e.key === "Return")) {
      setPromptCount(promptCount + 1)
      // Notice the `$`, for slice. CurrentPrompt is to register change in this variable
      setLatestPrompt(`${promptCount}$${currentPrompt}`)
    }
  };


  return (
    <Flex maxH="400px" borderWidth={1} color="white" >
      <BlockyPurpleArrow m={1} />
      <Textarea
        cursor="default"
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e)}
        onFocus={() => setPromptFocus(true)}
        onBlur={() => setPromptFocus(false)}
        autoFocus={true}
        pl={2}
        p={0}
        maxH="auto"
        variant={"unstyled"}
        resize="none" />
    </Flex>
  )
}

export default TerminalPrompter
