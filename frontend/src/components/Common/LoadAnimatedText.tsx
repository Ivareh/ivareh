/// <reference types="vite/client" />

import { useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { Flex, Text } from "@chakra-ui/react"

export interface Text {
  text: string;
  speed: "slow" | "fast";
}

interface LoadTextProps {
  texts: Text[]
}


const LoadAnimatedText = ({ texts }: LoadTextProps) => {
  gsap.registerPlugin(useGSAP);

  const onLoadText = useRef(null);

  useGSAP(() => {
    var tl = gsap.timeline();

    tl.fromTo(
      ".loadTextSlow",
      { opacity: 0 },
      { opacity: 1, duration: 0.08, stagger: 0.07 }
    );
    tl.fromTo(
      ".loadTextFast",
      { opacity: 0 },
      { opacity: 1, duration: 0.00001 }
    )

  }, { scope: onLoadText })



  const CharTextsLoad = () => (
    <Flex color="white" flexDirection="column" ref={onLoadText}>
      {texts.map((text, textIndex) => text.speed === "slow" ? (text.text.split("\n").map((line, lineIndex) => (
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
                className="loadTextSlow"
                key={`${lineIndex}-${charIndex}`}
                as="span"
              >{char}</Text>
            )
          ))}
        </Flex>
      ))
      ) : (
        <Text className="loadTextFast" key={textIndex}> {text.text} </Text>
      )
      )}
    </Flex>
  );
  return (
    <>
      <CharTextsLoad />
    </>
  )
}

export default LoadAnimatedText
