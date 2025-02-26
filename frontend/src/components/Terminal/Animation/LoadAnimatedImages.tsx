/// <reference types="vite/client" />
import { useRef, useState, useEffect, memo } from "react"
import { useQuery } from "@tanstack/react-query"

import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { Grid, GridItem, Image } from "@chakra-ui/react"

import { ImagesService, ImagePublic } from "../../../client"

export interface Image {
  url: string;
}

interface LoadTextProps {
  images: Image[] | null
  setProcessingPrompt: (state: boolean) => void;
}

const getImagesQuery = () => {
  return {
    queryFn: () =>
      ImagesService.endpointApiV1ImagesGet(),
    queryKey: ["items"],
  }
}


const LoadAnimatedImages = ({ images, setProcessingPrompt }: LoadTextProps) => {
  const [animated, setAnimated] = useState<Set<number>>(new Set<number>([]))
  const containerRef = useRef(null);
  const tl = useRef<gsap.core.Timeline>();

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getImagesQuery(),
    placeholderData: (prevData) => prevData,
  })

  const imgData = (data as { data: ImagePublic[] })?.data;


  console.log(data)

  useGSAP(() => {
    tl.current = gsap.timeline({
      onStart: () => setProcessingPrompt(true),
      onComplete: () => setProcessingPrompt(false),
    }
    );

    // images.forEach((_, index) => {
    //   if (!(animated.has(index))) {
    //     tl.current!.fromTo(
    //       `.image-${index}`,
    //       { opacity: 0 },
    //       { opacity: 1, duration: 0.00001, stagger: 0 },
    //       ">"
    //     );
    //   }
    //   setAnimated((prev) => new Set([...prev, index]))
    // });
  }, { dependencies: [images], scope: containerRef });

  useEffect(() => {
    console.log(imgData?.[0]?.url)
    if (tl.current && tl.current.isActive()) {
      setProcessingPrompt(tl.current.isActive())

    }
  }, [tl.current])


  // Construct image URL
  const imageUrl = `${imgData?.[0]?.url}?se=2025-02-26T13%3A22%3A25Z&sp=r&sv=2025-01-05&sr=c&sig=QIzPZngICJV2v0TRx/YpZlZtyqI/NjMSOtQBAXHm55A%3D`;

  const gridTemplateLargeScreens = `
    "a b c"
    "a b c"
    "a b c"
    "d b f"
    "d b f"
    "d e f"
    "d e f"
    "g h i"
    "g h i"
    "g h j"
  `


  const renderImage = () => {
    return (
      <GridItem gridArea="a">
        <Image src={imageUrl} alt="new" />
      </GridItem>
    )
  };

  return (
    <Grid
      width="100%"
      height="100%"
      gridTemplateColumns="repeat(3, minmax(360px, 1fr))"
      gridTemplateRows="repeat(10, minmax(60px, 1fr))"
      gridTemplateAreas={gridTemplateLargeScreens}
      gap="1.5rem"
      color="white"
      bgColor="ui.main"
      ref={containerRef}>
      {renderImage()}
    </Grid>
  );
};

export default memo(LoadAnimatedImages)
