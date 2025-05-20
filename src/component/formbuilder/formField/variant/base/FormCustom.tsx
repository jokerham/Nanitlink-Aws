import { ICustomFieldSetting, TFieldSetting } from "@/component/formbuilder/types";
import { Field } from "formik";
import { JsonObjectExpression } from "typescript";

export const FormCustomField = (fieldSetting: TFieldSetting) => {
  const customFormFieldSetting = fieldSetting as ICustomFieldSetting;
  const id = customFormFieldSetting.name;
  const Component = customFormFieldSetting.options.Component;
  const componentProps = customFormFieldSetting.options.componentPros as JsonObjectExpression;
  const additionalProps = { ...fieldSetting, ...componentProps };

  return (
    <Field
      as={Component}
      id={id}
      fullWidth
      {...additionalProps}
    />
  )
};
