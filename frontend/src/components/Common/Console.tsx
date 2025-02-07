import { useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { Flex, Text } from "@chakra-ui/react"

const Console = () => {
  gsap.registerPlugin(useGSAP);

  const onLoadText = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".loadText",
      { opacity: 0 },
      { opacity: 1, duration: 0.01, stagger: 0.05 }
    );
  }, { scope: onLoadText })

  const textToLoad = `Hello, I am Ivar.
This is my terminal.
Its purpose is to learn something about Ivar.

----------------
    `;

  const lines = textToLoad.split('\n');

  const CharTextsLoad = () => (
    <Flex color="white" flexDirection="column" ref={onLoadText}>
      {lines.map((line, lineIndex) => (
        <Flex
          key={lineIndex}
          whiteSpace="pre"
          as="span"
        >
          {line.split('').map((char, charIndex) => (
            char === ' ' ? (
              <Text
                key={`${lineIndex}-${charIndex}`}
                as="span"
              >&nbsp;</Text>
            ) : (
              <Text
                className="loadText"
                key={`${lineIndex}-${charIndex}`}
                as="span"
              >{char}</Text>
            )
          ))}
        </Flex>
      ))}
    </Flex>
  );

  return (
    <Flex>
      <Flex>
        <CharTextsLoad />
      </Flex>
    </Flex>
  )
}

export default Console
