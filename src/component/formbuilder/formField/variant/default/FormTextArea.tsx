import { TFieldSetting } from "component/formbuilder/types";
import { FormTextField } from "./FormTextField";

export const FormTextArea = (fieldSetting: TFieldSetting) => {
  const newFieldSetting = {
    ...fieldSetting,
    multiline: true,
    rows: 5,
  } as TFieldSetting;
  return <FormTextField {...newFieldSetting} />
}
