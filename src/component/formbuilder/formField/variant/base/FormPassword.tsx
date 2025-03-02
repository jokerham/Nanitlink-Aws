import { TextField } from "@mui/material";
import { TFieldSetting } from "component/formbuilder/types";
import { Field } from "formik";

export const FormPassword = (fieldSetting: TFieldSetting) => {
  const {name: id} = fieldSetting;
  const {type, ...rest} = fieldSetting;

  return (
    <Field
      as={TextField}
      id={id}
      type="password"
      fullWidth
      {...rest}
    />
  )
};
