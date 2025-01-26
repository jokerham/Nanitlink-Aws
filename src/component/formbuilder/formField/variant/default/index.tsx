import { TFieldSetting } from "component/formbuilder/types";
import { Base } from "../base";
import { Box } from "@mui/material";

export const Default = (props: TFieldSetting) => {

  return (
    <Box sx={{m: '5px'}}>
      <Base {...props as TFieldSetting}/>
    </Box>
  );
}
