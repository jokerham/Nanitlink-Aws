import { TextField } from "@mui/material";
import { TFieldSetting } from "component/formbuilder/types";
import { Field } from "formik";

export const FormTextField = (fieldSetting: TFieldSetting) => {
  const {name: id} = fieldSetting;

  return (
    <Field
      as={TextField}
      id={id}
      {...fieldSetting}
    />
  )
};
