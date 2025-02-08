import { useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { Flex, Text, Input } from "@chakra-ui/react"

const ConsoleInput = () => {
  gsap.registerPlugin(useGSAP);

  const onLoadText = useRef(null);

  useGSAP(() => {


  }, { scope: onLoadText })



  return (
    <Flex h={"30px"} borderWidth={1} color="white" >
      <Input variant={"unstyled"}/>
    </Flex>
  )
}

export default ConsoleInput

