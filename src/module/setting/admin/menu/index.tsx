import { Fragment } from "react/jsx-runtime";
import { Typography } from "@mui/material";
import { TitleBox } from "component/customMui";
import PageSetup from "./pageSetup";
import MenuSetup from "./menuSetup";

const Menu = () => {
  return (
    <Fragment>
      <TitleBox>
        <Typography variant="h1">Admin Setup</Typography>
      </TitleBox>
      <PageSetup/>
      <MenuSetup/>
    </Fragment>
  );
};

export default Menu;