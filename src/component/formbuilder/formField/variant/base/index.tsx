import { EFieldType, TFieldSetting } from "component/formbuilder/types";
import { FormTextField } from "./FormTextField";
import { FormSelect } from "../base/formSelect";
import { FormCheckBox } from "./FormCheckBox";
import { FormTextArea } from "./FormTextArea";
import { FormRadio } from "./FormRadio";
import { FormFile } from "../base/formFile";

export const Base = (props: TFieldSetting) => {
  switch (props.type) {
    case EFieldType.Checkbox:
      return <FormCheckBox {...props}/>
    case EFieldType.File:
        return <FormFile {...props}/>
    case EFieldType.Radio:
      return <FormRadio {...props}/>
    case EFieldType.TextArea:
      return <FormTextArea {...props}/>
    case EFieldType.TextField:
      return <FormTextField {...props}/>
    case EFieldType.Select:
      return <FormSelect {...props}/>
    default:
      return <></>;
  }
}
