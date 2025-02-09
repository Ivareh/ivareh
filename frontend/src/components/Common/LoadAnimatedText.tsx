/// <reference types="vite/client" />
import { useRef, useState } from "react"

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
  const [animated, setAnimated] = useState<Set<number>>(new Set<number>([]))
  const containerRef = useRef(null);
  const tl = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    tl.current = gsap.timeline();
    texts.forEach((_, index) => {
      if (!(animated.has(index))) {
        tl.current!.fromTo(
          `.loadTextSlow-${index}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.08, stagger: 0.07 },
          ">"
        );

        tl.current!.fromTo(
          `.loadTextFast-${index}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.00001, stagger: 0 },
          ">"
        );
      }
      setAnimated((prev) => new Set([...prev, index]))
    });
  }, { dependencies: [texts], scope: containerRef });

  const renderText = (text: Text, textIndex: number) => {
    const className = `loadText${text.speed === 'slow' ? 'Slow' : 'Fast'}-${textIndex}`;
    return text.text.split("\n").map((line, lineIndex) => (
      <Flex key={`${textIndex}-${lineIndex}`} whiteSpace="pre" as="span">
        {line.split('').map((char, charIndex) => (
          char === ' ' ? (
            <Text key={`${textIndex}-${lineIndex}-${charIndex}`} as="span">&nbsp;</Text>
          ) : (
            <Text
              key={`${textIndex}-${lineIndex}-${charIndex}`}
              className={className}
              as="span"
            >
              {char}
            </Text>
          )
        ))}
      </Flex>
    ));
  };

  return (
    <Flex color="white" flexDirection="column" ref={containerRef}>
      {texts.map((text, textIndex) => (
        <div key={textIndex}>
          {renderText(text, textIndex)}
        </div>
      ))}
    </Flex>
  );
};

export default LoadAnimatedText;

