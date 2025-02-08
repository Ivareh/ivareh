import { Grid } from "@chakra-ui/react"

import ConsoleInput from "./ConsoleInput"
import LoadAnimatedText, { Text } from "../Common/LoadAnimatedText"


const Console = () => {

  const introTexts: Text[] = [{
    text: `Hello, I am Ivar.
Welcome to my terminal.

----------------
`, speed: "slow"
  },
  { text: `Need help? Type 'help' and hit ENTER or RETURN`, speed: "fast" }
  ]


  return (
    <Grid h="500px">
      <LoadAnimatedText texts={introTexts} />
      <ConsoleInput />
    </Grid>
  )
}

export default Console
