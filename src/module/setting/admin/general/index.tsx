import { Box, Typography } from "@mui/material";
import { TitleBox } from "component/customMui";
import { Section, SectionContent, SectionTitle } from "component/Section";
import Primary from "./primary";
import EmbedFilter from "./embedFilter";
import Advanced from "./advanced";
import SiteLock from "./siteLock";

const General = () => {
  return (
    <Box>
      <TitleBox>
        <Typography variant="h1">General Setting</Typography>
      </TitleBox>
      {/* PRIMARY ################################################################################ */}
      <Primary/>
      {/* embed Filter ################################################################################ */}
      <Section>
        <SectionTitle>embed Filter</SectionTitle>
        <SectionContent>
          <EmbedFilter/>
        </SectionContent>
      </Section>
      {/* Advanced ################################################################################ */}
      <Section>
        <SectionTitle>Advanced</SectionTitle>
        <SectionContent>
          <Advanced/>
        </SectionContent>
      </Section>
      {/* Site Lock ################################################################################ */}
      <Section>
        <SectionTitle>Site Lock</SectionTitle>
        <SectionContent>
          <SiteLock/>
        </SectionContent>
      </Section>
    </Box>
  );
};

export default General;