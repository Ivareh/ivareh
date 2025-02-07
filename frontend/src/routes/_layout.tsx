import { Flex } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/_layout")({
  component: Layout,
})

function Layout() {

  return (
    <Flex maxW="large" h="auto" position="relative">
      yo
    </Flex>
  )
}
