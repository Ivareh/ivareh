import { Container, Box, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import Terminal from "../../components/Terminal/Terminal"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {

  return (
    <>
      <Container maxW="full" w="full" overflowY="auto">
        <Box pt={12}>
          <Text
            justifySelf={"center"}
            as="pre"
            color="white"
            fontSize="md"
            fontFamily="monospace"
            display={{ base: "block", md: "none" }}
          >
            {String.raw`
██╗██╗   ██╗ █████╗ ██████╗
██║██║   ██║██╔══██╗██╔══██╗
██║██║   ██║███████║██████╔╝
██║╚██╗ ██╔╝██╔══██║██╔══██╗
██║ ╚████╔╝ ██║  ██║██║  ██║
╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝
            `}
          </Text>

          <Text
            as="pre"
            color="white"
            fontSize="md"
            fontFamily="monospace"
            display={{ base: "none", md: "block" }}
          >
            {String.raw`
██╗██╗   ██╗ █████╗ ██████╗    ██████╗ ███████╗██╗   ██╗
██║██║   ██║██╔══██╗██╔══██╗   ██╔══██╗██╔════╝██║   ██║
██║██║   ██║███████║██████╔╝   ██║  ██║█████╗  ██║   ██║
██║╚██╗ ██╔╝██╔══██║██╔══██╗   ██║  ██║██╔══╝  ╚██╗ ██╔╝
██║ ╚████╔╝ ██║  ██║██║  ██║██╗██████╔╝███████╗ ╚████╔╝
╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝  ╚═══╝
            `}
          </Text>
        </Box>
        <Terminal />
      </Container>
    </>
  )
}
