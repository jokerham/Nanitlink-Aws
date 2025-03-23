import { TFieldSetting, ICustomFieldSetting } from "component/formbuilder/types";
import { Field } from "formik";

export const FormCustomField = (fieldSetting: TFieldSetting) => {
  const customFormFieldSetting = fieldSetting as ICustomFieldSetting;
  const id = customFormFieldSetting.name;
  const Component = customFormFieldSetting.options.Component;

  return (
    <Field
      as={Component}
      id={id}
      fullWidth
      {...fieldSetting}
    />
  )
};
