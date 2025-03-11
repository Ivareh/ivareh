import { memo } from "react"
import LoadAnimatedImages from "../LoadAnimatedImages"
import LoadAnimatedText from "../LoadAnimatedText"
import { Text } from "../LoadAnimatedText"

interface LoadBreadProps {
  setProcessingPrompt: (state: boolean) => void
}

const LoadBread = ({ setProcessingPrompt }: LoadBreadProps) => {
  const filterParams = {
    requestBody: {
      filter: { "category": "bread" },
      sort_columns: ["captured_time"],
      sort_orders: ["desc"],
    }
  }

  const breadText: Text[] = [{
    text:
      `These are the sourdough bread I have created so far!
I started making sourdough bread in the summer of 2024 :)
    `, duration: 0.03, stagger: 0.03
  }]

  return (
    <>
      <LoadAnimatedText
        texts={breadText}
        fontSize={["x-large", "xx-large", "xxx-large"]}
        fontWeight="bold"
        color="yellow.400"
        textAlign={["center", "center", "left"]}
        mb={4}
        setProcessingPrompt={setProcessingPrompt}
      />
      <LoadAnimatedImages filterParams={filterParams} setProcessingPrompt={setProcessingPrompt} />
    </>
  )
}

export default memo(LoadBread)
