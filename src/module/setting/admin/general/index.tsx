import { Box, Typography } from "@mui/material";
import { TitleBox } from "component/customMui";
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
      <Primary/>
      <EmbedFilter/>
      <Advanced/>
      <SiteLock/>
    </Box>
  );
};

export default General;