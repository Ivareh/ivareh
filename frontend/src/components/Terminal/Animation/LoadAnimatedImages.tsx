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
      ImagesService.getMultiImagesApiV1GetMultiImagesGet(),
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
    if (tl.current && tl.current.isActive()) {
      setProcessingPrompt(tl.current.isActive())
    }
  }, [tl.current])

  function getSpanEstimate(size: number) {
    if (size > 3000) {
      return 2
    }

    return 1
  }


  const renderImage = (image: ImagePublic, key: number) => {
    const style = {
      gridColumnEnd: `span ${getSpanEstimate(image.width)}`,
      gridRowEnd: `span 1`,
    };

    const imageUrl = `${image.url}?se=2025-02-27T13%3A51%3A59Z&sp=r&sv=2025-01-05&sr=c&sig=VPD/6Q6DHGFn7hY%2BQIKEvT40n3Kh8hrkWJip71OrcXc%3D`;

    return (
      <GridItem style={style} key={key} minWidth="260px"> {/* Add minWidth here */}
        <Image
          src={imageUrl}
          alt={`Image ${key} of ${image.category}`}
          objectFit="cover"
          sx={{
            minWidth: '259px', // Fallback for min-width
            'img': {
              minWidth: '259px',
            }
          }}
        />
      </GridItem>
    )
  };

  return (
    <Grid
      width="100%"
      height="100%"
      gridTemplateColumns="repeat(auto-fill, minmax(260px, 1fr))" // Ensure column min-width
      gridTemplateRows="repeat(auto-fit, minmax(260px, auto))" // Add row min-height
      gridAutoFlow="row dense"
      gap="1.8rem"
      color="white"
      bgColor="ui.main"
      ref={containerRef}>
      {data && data.map((image, index) => renderImage(image, index))}
    </Grid>
  );
};

export default memo(LoadAnimatedImages)
