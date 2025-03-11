import { useEffect } from "react"

import { Flex } from "@chakra-ui/react"
import { Outlet, createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/_layout")({
  component: Layout,
})

function Layout() {

  // Dynamically sets vh for mobile screens, browsers etc
  useEffect(() => {
    const setVwVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
      document.documentElement.style.setProperty("--vw", `${window.innerWidth * 0.01}px`);
    };

    setVwVh();
    window.addEventListener("resize", setVwVh);

    return () => {
      window.removeEventListener("resize", setVwVh);
    }
  }, []);


  return (
    <Flex bgColor="ui.main" sx={{
      height: "calc(var(--vh, 1vh) * 99.94)",
      width: "calc(var(--vw, 1vw) * 99.999)"
    }} >
      <Outlet />
    </Flex>
  )
}
