import { Typography } from "@mui/material";
import { TitleBox } from "component/customMui";
import Primary from "./primary";
import EmbedFilter from "./embedFilter";
import Advanced from "./advanced";
import SiteLock from "./siteLock";
import { Fragment } from "react/jsx-runtime";

const General = () => {
  return (
    <Fragment>
      <TitleBox>
        <Typography variant="h1">General Setting</Typography>
      </TitleBox>
      <Primary/>
      <EmbedFilter/>
      <Advanced/>
      <SiteLock/>
    </Fragment>
  );
};

export default General;