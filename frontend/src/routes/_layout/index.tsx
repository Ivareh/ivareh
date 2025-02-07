import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text as="pre" color="white" fontSize="md" fontFamily="monospace">
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
      </Container>
    </>
  )
}
