import { Checkbox, FormControlLabel } from "@mui/material";
import { IOptionFieldSetting, TFieldSetting } from "component/formbuilder/types";
import { Field } from "formik";
import { Fragment } from "react/jsx-runtime";

export const FormCheckBox = (props: TFieldSetting) => {
  const optionFieldSetting = props as IOptionFieldSetting
  const { name, options, type, ...restProp } = optionFieldSetting;

  return (
    <Fragment>
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
    </Fragment>
  );
}
