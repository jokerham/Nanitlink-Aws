import { Checkbox, FormControlLabel } from "@mui/material";
import { ColumnBox, RowBox } from "component/customMui";
import { IOptionFieldSetting, TFieldSetting } from "component/formbuilder/types";
import { Field, FormikValues, useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

export const FormCheckBox = (props: TFieldSetting) => {
  const optionFieldSetting = props as IOptionFieldSetting
  const { options, type, checked, onChange, ...restProp } = optionFieldSetting;
  const WrapperBox = options.direction === 'column' ? ColumnBox : RowBox;
  const formik = useFormikContext();
  const formikValue: FormikValues = formik.values as FormikValues;
  const initialValue: string[] = formikValue[props.name];
  const [value, setValue] = useState<string[]>(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: selectedValue } = event.target;
    const newValue = value.includes(selectedValue)
      ? value.filter((v) => v !== selectedValue)
      : [...value, selectedValue];
    setValue(newValue);
    onChange && onChange(event);
  };

  return (
    <WrapperBox sx={{gap: '2px'}}>
      {options.data.map((option, index) => (
        <FormControlLabel key={index} control={
          <Field
            type="checkbox"
            as={Checkbox}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={handleChange}
            // icon={<GrCheckbox/>} 
            // checkedIcon={<GrCheckboxSelected/>}
            {...restProp} />
          } label={option.label}/>
      ))}
    </WrapperBox>
  );
}
