import { useEffect } from "react"

import { Flex } from "@chakra-ui/react"
import { Outlet, createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/_layout")({
  component: Layout,
})

function Layout() {

  // Dynamically sets vh for mobile screens, browsers etc
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);


  return (
    <Flex bgColor="ui.main" minW="510px" sx={{ height: "calc(var(--vh, 1vh) * 100)" }} >
      <Outlet />
    </Flex>
  )
}
