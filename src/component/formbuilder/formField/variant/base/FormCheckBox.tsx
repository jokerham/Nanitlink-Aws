import { Checkbox, FormControlLabel } from "@mui/material";
import { ColumnBox, RowBox } from "component/customMui";
import { IOptionFieldSetting, TFieldSetting } from "component/formbuilder/types";
import { Field } from "formik";

export const FormCheckBox = (props: TFieldSetting) => {
  const optionFieldSetting = props as IOptionFieldSetting
  const { name, options, type, ...restProp } = optionFieldSetting;

  const WrapperBox = options.direction === 'column' ? ColumnBox : RowBox;

  return (
    <WrapperBox sx={{gap: '2px'}}>
      {options.data.map((option, index) => (
        <FormControlLabel key={index} control={
          <Field
            type="checkbox"
            as={Checkbox}
            name={`${name}.${option.value}`} 
            // icon={<GrCheckbox/>} 
            // checkedIcon={<GrCheckboxSelected/>}
            {...restProp} />
          } label={option.label}/>
      ))}
    </WrapperBox>
  );
}
