import { Grid, Text, GridItem } from "@/lib/ui";

import { Fragment } from "react";

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
      {entries.map((k, i) => (
        <Fragment key={i}>
          <GridItem>
            <Text textStyle="md" fontWeight="bold">
              {k[0]}
            </Text>
          </GridItem>
          <GridItem ml="10">
            <Text textStyle="md">{k[1]}</Text>
          </GridItem>
        </Fragment>
      ))}
    </Grid>
  );
}
