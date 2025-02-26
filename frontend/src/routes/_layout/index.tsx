import { Container, Box, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import Terminal from "../../components/Terminal/Terminal"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {

  return (
    <>
      <Container maxW="full" overflowY="auto">
        <Box pt={12}>
          <Text className="loadText" as="pre" color="white" fontSize="md" fontFamily="monospace">
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
