import { Container, Box, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import Console from "../../components/Console/Console"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {

  return (
    <>
      <Container maxW="full" minH="100%">
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
        <Console />
      </Container>
    </>
  )
}
