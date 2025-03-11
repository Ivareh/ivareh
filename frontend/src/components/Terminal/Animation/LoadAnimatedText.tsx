/// <reference types="vite/client" />
import { useRef, useState, useEffect, memo } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Box, Text, TextProps, Link } from "@chakra-ui/react"

export interface Text {
  text: string
  duration: number
  stagger: number
  styles?: TextProps
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
    const urlRegex = /(https?:\/\/[^\s]+)/
    // Process each line (split by newline)
    return text.text.split("\n").map((line, lineIndex) => {
      // Split line into tokens (words and spaces) preserving whitespace
      const tokens = line.split(/(\s+)/).filter(t => t !== "")

      return (
        <Text
          key={`${textIndex}-${lineIndex}`}
          whiteSpace="pre-wrap"
          display="block"
          {...text.styles}
          {...props}
        >
          {tokens.map((token, tokenIndex) => {
            // If token is just whitespace, preserve it.
            if (/\s/.test(token)) {
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
            // If token is a URL, wrap it in a Link and iterate over its characters.
            if (urlRegex.test(token)) {
              return (
                <Link
                  key={`${textIndex}-${lineIndex}-link-${tokenIndex}`}
                  href={token}
                  color="teal.500"
                  isExternal
                >
                  {token.split("").map((char, charIndex) => (
                    <Text
                      key={`${textIndex}-${lineIndex}-link-${tokenIndex}-char-${charIndex}`}
                      className={className}
                      as="span"
                    >
                      {char}
                    </Text>
                  ))}
                </Link>
              )
            }
            // Otherwise, render the word character by character.
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
