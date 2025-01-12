import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { IOptionFieldSetting, TFieldSetting } from "component/formbuilder/types";
import { Field, FieldProps, useFormikContext } from "formik";

export const FormRadio = (props: TFieldSetting) => {
  const optionFieldSetting = props as IOptionFieldSetting
  const { label, options, type, ...restProps } = optionFieldSetting;

  // Access Formik context to manually set the field value
  const { setFieldValue } = useFormikContext();
  
  return (
    <FormControl>
      {label && 
        <FormLabel id={`${restProps.name}-label`}>Gender</FormLabel>
      }
      <RadioGroup row
        name={restProps.name}
        onChange={(e) => setFieldValue(restProps.name, e.target.value)}>
        {options.data.map((option) => (
          <Field
            key={option.value}
            name={restProps.name}
            type="radio"
            value={option.value}
          >
            {({ field }: FieldProps) => (
              <FormControlLabel
                control={<Radio {...field} />}
                label={option.label}
              />
            )}
          </Field>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
