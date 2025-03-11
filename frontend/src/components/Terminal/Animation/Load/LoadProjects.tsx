import { memo } from "react"
import LoadAnimatedText from "../LoadAnimatedText"
import { Text } from "../LoadAnimatedText"

interface LoadBreadProps {
  setProcessingPrompt: (state: boolean) => void
}

const LoadProjects = ({ setProcessingPrompt }: LoadBreadProps) => {
  const projectsText: Text[] = [{
    text: `These are my projects:`
    , duration: 0.03, stagger: 0.03, styles: {
      fontSize: ["x-large", "xx-large", "xxx-large"],
      textAlign: ["center", "center", "left"],
      fontWeight: "bold",
      color: "yellow.400",
    },
  }, {
    text: `
- Path of Modifiers: Website application for analyzing prices on items with customized parameters plotted on graphs in Path of Exile.
https://github.com/Path-of-Modifiers/pathofmodifiersapp


- Ivareh: My personal terminal with playful animations and storages
https://github.com/Ivareh/ivareh


- DB optimize logger: Logs and plots results for executed queries organized from a database with observability pipeline
https://github.com/Ivareh/db-optimize-logger


- NVE data analytics: Extract, load, transform and visualize Reservoir Statistics data
https://github.com/Ivareh/Visualize-NVE-Reservoir-Statistics

`, duration: 0.001, stagger: 0.01, styles: {
      fontSize: "md",
      fontWeight: "normal",
      color: "red.400",
    },
  }
  ]


  return (
    <>
      <LoadAnimatedText
        texts={projectsText}
        mb={4}
        setProcessingPrompt={setProcessingPrompt}
      />
    </>
  )
}

export default memo(LoadProjects)
