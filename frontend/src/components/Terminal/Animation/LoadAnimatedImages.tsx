/// <reference types="vite/client" />
import { useRef, useState, useEffect, memo } from "react"
import { useQuery } from "@tanstack/react-query"

import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { Grid, GridItem, Image, Text } from "@chakra-ui/react"

import { ImagesService, ImagePublic, GetMultiImagesApiV1GetMultiImagesPostData, UtilsService } from "../../../client"
import { formatReaderFriendTime } from "../Utils";

export interface Image {
  url: string;
}

interface LoadImageProps {
  filterParams: GetMultiImagesApiV1GetMultiImagesPostData | null
  setProcessingPrompt: (state: boolean) => void;
}

const getImagesQuery = (filterParams: GetMultiImagesApiV1GetMultiImagesPostData | undefined) => {
  return {
    queryFn: () =>
      ImagesService.getMultiImagesApiV1GetMultiImagesPost(filterParams),
    queryKey: ["images"],
  }
}

const getSasToken = () => {
  return {
    queryFn: () =>
      UtilsService.getContainerSasApiV1UtilsContainerSasTokenGet(),
    queryKey: ["sas-token"],
  }
}


const LoadAnimatedImages = ({ filterParams, setProcessingPrompt }: LoadImageProps) => {
  const [animated, setAnimated] = useState<Set<number>>(new Set<number>([]))
  const containerRef = useRef(null);
  const tl = useRef<gsap.core.Timeline>();

  const { data: imageData } = useQuery({
    ...getImagesQuery({ ...filterParams }),
    placeholderData: (prevData) => prevData,
  })

  const { data: sasToken } = useQuery({
    ...getSasToken(),
    placeholderData: (prevData) => prevData,
  })


  useGSAP(() => {
    tl.current = gsap.timeline({
      onStart: () => setProcessingPrompt(true),
      onComplete: () => setProcessingPrompt(false),
    }
    );

    imageData?.forEach((_, index) => {
      if (!(animated.has(index))) {
        tl.current!.fromTo(
          `.image-${index}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, stagger: 100 },

        );
      }
      setAnimated((prev) => new Set([...prev, index]))
    });
  }, { dependencies: [imageData], scope: containerRef });

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

    const imageUrl = `${image.url}?${sasToken}`


    return (
      <GridItem style={style} key={key} >
        <Image
          className={`image-${key}`}
          src={imageUrl}
          alt={`Image ${key} of ${image.category}`}
          minW={["160px", "200px", "260px"]}
        />
        <Text> Baked: {formatReaderFriendTime(image.captured_time)} </Text>
      </GridItem>
    )
  };

  return (
    <Grid
      ref={containerRef}
      gridTemplateColumns={{ base: "1fr", md: "repeat(auto-fill, minmax(260px, 1fr))" }}
      gridTemplateRows={["repeat(auto-fit, minmax(180px, auto))", "repeat(auto-fit, minmax(220px, auto))", "repeat(auto-fit, minmax(260px, auto))"]}
      gridAutoFlow="row dense"
      gap={["0.5rem", "1rem", "1.8rem"]}
      color="white"
      bgColor="ui.main"
    >
      {imageData && imageData.map((image, index) => renderImage(image, index))}
    </Grid>

  );
};

export default memo(LoadAnimatedImages)
