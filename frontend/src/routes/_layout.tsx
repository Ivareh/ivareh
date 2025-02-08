import { Flex } from "@chakra-ui/react"
import { Outlet, createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/_layout")({
  component: Layout,
})

function Layout() {

  return (
    <Flex bgColor="ui.main" h="100vh" position="relative">
      <Outlet />
    </Flex>
  )
}
