import {
  Heading,
  Grid,
  Box,
  Text,
  GridItem,
  Container,
  FancyArrowRight,
  AspectRatio,
  Flex,
  ContainerProps,
} from "@/lib/ui";
import Image from "next/image";
import Link from "next/link";

type Props = {
  content: {
    title?: string;
    description?: string;
    author?: string;
    discussion?: string;
    status?: string;
    category?: string;
    created?: string;
    requires?: string;
  };
};

export function Preamble(content: Props) {
  const entries = Object.entries(content.content).filter(
    (k) => k[0] != "title"
  );
  if (entries.length == 0) {
    return null;
  }
  return (
    <Grid mb="10" templateColumns="auto 1fr" gap={1}>
      {entries.map((k) => (
        <>
          <GridItem>
            <Text textStyle="md" fontWeight="bold">
              {k[0]}
            </Text>
          </GridItem>
          <GridItem ml="10">
            <Text textStyle="md">{k[1]}</Text>
          </GridItem>
        </>
      ))}
    </Grid>
  );
}
