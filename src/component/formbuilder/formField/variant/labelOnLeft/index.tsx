import { TFieldSetting } from "component/formbuilder/types";
import { Default } from "../default";
import { Grid2, Typography } from "@mui/material";

export const LabelOnLeft = (props: TFieldSetting) => {
  const { label, ...fieldSetting} = props;

  return (
    <Grid2 container spacing={2} sx={{py: '10px', borderBottom: '1px solid #ccc'}}>
      <Grid2 size={2} sx={{textAlign: 'right', lineHeight: '30px', py: '6px'}}>
        <Typography variant="h4">{label}</Typography>
      </Grid2>
      <Grid2 size={10}>
        <Default {...(fieldSetting as TFieldSetting)}/>
      </Grid2>
    </Grid2>
  );
}
