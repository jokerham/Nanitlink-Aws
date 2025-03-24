import { EFieldType, TFieldSetting } from "@/component/formbuilder/types";
import { Box, Grid2, Typography } from "@mui/material";
import { SmallSize } from "../smallSize";

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

  if (fieldSetting.type === EFieldType.Hidden) {
    return <SmallSize {...fieldSetting as TFieldSetting}/>;
  } else {
    return (
      <Grid2 container spacing={2} sx={containerStyle}>
        <Grid2 size={2} sx={labelStyle}>
          <Typography variant="h4">
            {(fieldSetting.required ?? false) && (
              <Box component="small" sx={{color: '#F00', mr: '4px'}}>*</Box>
            )}
            {label}
          </Typography>
        </Grid2>
        <Grid2 size={10}>
          <SmallSize {...fieldSetting as TFieldSetting}/>
        </Grid2>
      </Grid2>
    );
  }
}
