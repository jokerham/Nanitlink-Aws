import { EFieldType, TFieldSetting } from "component/formbuilder/types";
import { FormTextField } from "./FormTextField";
import { FormSelect } from "../base/formSelect";
import { FormCheckBox } from "./FormCheckBox";
import { FormPassword } from "./FormPassword";
import { FormTextArea } from "./FormTextArea";
import { FormRadio } from "./FormRadio";
import { FormFile } from "../base/formFile";
import { FormCustomField } from "./FormCustom";

export const Base = (props: TFieldSetting) => {
  switch (props.type) {
    case EFieldType.Checkbox:
      return <FormCheckBox {...props}/>
    case EFieldType.File:
        return <FormFile {...props}/>
    case EFieldType.Radio:
      return <FormRadio {...props}/>
    case EFieldType.Password:
      return <FormPassword {...props} />
    case EFieldType.TextArea:
      return <FormTextArea {...props}/>
    case EFieldType.TextField:
      return <FormTextField {...props}/>
    case EFieldType.Select:
      return <FormSelect {...props}/>
    case EFieldType.Custom:
      return <FormCustomField {...props}/>
    default:
      return <></>;
  }
}
