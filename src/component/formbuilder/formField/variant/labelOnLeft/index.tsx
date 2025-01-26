import { TFieldSetting } from "component/formbuilder/types";
import { Base } from "../base";
import { Grid2, Typography } from "@mui/material";

// Define styles outside the return component
const containerStyle = {
  py: '10px',
  '&:not(:last-of-type)': {
    borderBottom: '1px dotted #ddd'
  },
  '&:last-of-type': {
    borderBottom: '1px solid #ddd'
  },
};

const labelStyle = {
  textAlign: 'right',
  lineHeight: '30px',
  py: '6px',
};

export const LabelOnLeft = (props: TFieldSetting) => {
  const { label, ...fieldSetting} = props;

  return (
    <Grid2 container spacing={2} sx={containerStyle}>
      <Grid2 size={2} sx={labelStyle}>
        <Typography variant="h4">{label}</Typography>
      </Grid2>
      <Grid2 size={10}>
        <Base {...fieldSetting as TFieldSetting}/>
      </Grid2>
    </Grid2>
  );
}
