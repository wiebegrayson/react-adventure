import React from "react";
import { Box, Stack, Text, useMediaQuery, useTheme } from "@chakra-ui/react";
import Star from "@mui/icons-material/Star";

export interface IProps {
  title: string;
  subtitle: string;
  emissions: string;
  rating: number;
  img: string;
}

const Card = ({ title, subtitle, emissions, rating, img }: IProps) => {
  const { __cssMap } = useTheme();
  const [tabletUp, smallToTablet] = useMediaQuery([
    "(min-width: 425px)",
    "(min-width: 320px) and (max-width: 424.99px)"
  ]);

  return (
    <Box
      border="8px solid white"
      borderRadius="2xl"
      pt={14}
      my={tabletUp ? 0 : 5}
      px={tabletUp ? 10 : 7}
      width="min(465px, 100%)"
      bgImg={img}
      bgPos="center"
      bgSize="cover"
      bgColor="#a1a1a1"
      bgBlendMode="color-burn"
      color="white"
    >
      <Text as="h2" fontSize="3xl" fontWeight="700" textAlign="center">
        {title}
      </Text>
      <Text fontSize="md" fontWeight="500" textAlign="center">
        {subtitle}
      </Text>
      <Stack
        direction="row"
        spacing={5}
        bgColor="#1f2837"
        p={5}
        my={8}
        justify="space-between"
        borderRadius="2xl"
      >
        <Text fontSize="lg" fontWeight="600" textAlign="center">
          Emissions offset:
        </Text>
        <Text
          fontSize={!smallToTablet ? "lg" : "md"}
          fontWeight="500"
          textAlign="center"
        >
          {emissions} CO<sub>2</sub>e
        </Text>
      </Stack>
      <Stack
        direction="row"
        justify="space-between"
        color="blackAlpha.900"
        bgColor="white"
        p={5}
        borderTopRadius="2xl"
      >
        <Text fontWeight="500" textAlign="center">
          Trip rating
        </Text>
        <Stack direction="row" align="center" spacing={2}>
          <Stack direction="row" align="center" spacing={0.5}>
            {[1, 2, 3, 4, 5].map(n => {
              n > rating && console.log(rating - Math.floor(rating));
              return (
                <Box
                  key={n}
                  sx={
                    n === Math.ceil(rating)
                      ? {
                          top: "-2.2px",
                          transform: "scale(0.88)",
                          clipPath:
                            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                          position: "relative",
                          "&::before": {
                            content: "''",
                            position: "absolute",
                            bgColor: __cssMap["colors.yellow.400"].value,
                            height: "100%",
                            width: `${
                              +(rating - Math.floor(rating)).toFixed(1) * 100
                            }%`,
                            zIndex: 2
                          },
                          "&::after": {
                            content: "''",
                            position: "absolute",
                            top: 0,
                            right: "2.3px", // align with <path>
                            bgColor: __cssMap["colors.gray.900"].value,
                            height: "100%",
                            width: "100%",
                            zIndex: 1
                          }
                        }
                      : undefined
                  }
                >
                  <Star
                    sx={
                      n <= rating
                        ? { color: __cssMap["colors.yellow.400"].value }
                        : n === Math.ceil(rating)
                        ? {
                            color: "transparent",
                            position: "relative",
                            display: "block",
                            zIndex: 5,
                            overflow: "hidden"
                          }
                        : undefined
                    }
                  />
                </Box>
              );
            })}
          </Stack>
          <Text fontSize="xl" fontWeight="500" textAlign="center">
            {rating}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Card;
