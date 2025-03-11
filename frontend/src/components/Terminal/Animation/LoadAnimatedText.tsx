/// <reference types="vite/client" />
import { useRef, useState, useEffect, memo } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Box, Text, TextProps } from "@chakra-ui/react"

export interface Text {
  text: string
  duration: number
  stagger: number
}

interface LoadTextProps extends TextProps {
  texts: Text[]
  setProcessingPrompt: (state: boolean) => void
}

const LoadAnimatedText = ({ texts, setProcessingPrompt, ...props }: LoadTextProps) => {
  const [animated, setAnimated] = useState<Set<number>>(new Set<number>([]))
  const containerRef = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline>()

  useGSAP(
    () => {
      tl.current = gsap.timeline({
        onStart: () => setProcessingPrompt(true),
        onComplete: () => setProcessingPrompt(false),
      })

      texts.forEach((text, index) => {
        if (!animated.has(index)) {
          tl.current!.fromTo(
            `.loadText-${index}`,
            { opacity: 0 },
            { opacity: 1, duration: text.duration, stagger: text.stagger },
            ">"
          )
        }
        setAnimated((prev) => new Set([...prev, index]))
      })
    },
    { dependencies: [texts], scope: containerRef }
  )

  useEffect(() => {
    if (tl.current && tl.current.isActive()) {
      setProcessingPrompt(tl.current.isActive())
    }

    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [tl.current])

  const renderText = (text: Text, textIndex: number) => {
    const className = `loadText-${textIndex}`
    return text.text.split("\n").map((line, lineIndex) => {
      // Split line into words and spaces while preserving original spacing
      const tokens = line.split(/(\s+)/).filter(t => t !== "")

      return (
        <Text
          key={`${textIndex}-${lineIndex}`}
          whiteSpace="pre-wrap"
          display="block"
          {...props}
        >
          {tokens.map((token, tokenIndex) => {
            if (/\s/.test(token)) {
              // Render preserved whitespace
              return (
                <Text
                  as="span"
                  whiteSpace="pre"
                  key={`${textIndex}-${lineIndex}-space-${tokenIndex}`}
                >
                  {token}
                </Text>
              )
            }
            // Render word with characters
            return (
              <Text
                as="span"
                display="inline-block"
                whiteSpace="nowrap"
                key={`${textIndex}-${lineIndex}-word-${tokenIndex}`}
              >
                {token.split("").map((char, charIndex) => (
                  <Text
                    key={`${textIndex}-${lineIndex}-word-${tokenIndex}-char-${charIndex}`}
                    className={className}
                    as="span"
                  >
                    {char}
                  </Text>
                ))}
              </Text>
            )
          })}
        </Text>
      )
    })
  }

  return (
    <Box ref={containerRef} >
      {
        texts.map((text, textIndex) => (
          <div key={textIndex}>{renderText(text, textIndex)}</div>
        ))
      }
    </Box>
  )
}

export default memo(LoadAnimatedText)
