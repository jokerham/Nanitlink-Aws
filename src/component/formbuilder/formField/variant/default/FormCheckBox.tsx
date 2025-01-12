import { Checkbox, FormControlLabel, Box } from "@mui/material";
import { IOptionFieldSetting, TFieldSetting } from "component/formbuilder/types";
import { Field } from "formik";

export const FormCheckBox = (props: TFieldSetting) => {
  const optionFieldSetting = props as IOptionFieldSetting
  const { name, options, type, ...restProp } = optionFieldSetting;

  return (
    <Box>
      {options.data.map((option) => (
        <FormControlLabel control={
          <Field
            type="checkbox"
            as={Checkbox}
            name={`${name}.${option.value}`} 
            // icon={<GrCheckbox/>} 
            // checkedIcon={<GrCheckboxSelected/>}
            {...restProp} />
          } label={option.label}/>
      ))}
    </Box>
  );
}
