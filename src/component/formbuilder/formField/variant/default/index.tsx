import { EFieldType, TFieldSetting } from "component/formbuilder/types";
import { FormTextField } from "./FormTextField";
import { FormSelect } from "./formSelect";
import { FormCheckBox } from "./FormCheckBox";

export const Default = (props: TFieldSetting) => {
  switch (props.type) {
    case EFieldType.Checkbox:
      return <FormCheckBox {...props}/>
    case EFieldType.TextField:
      return <FormTextField {...props}/>
    case EFieldType.Select:
      return <FormSelect {...props}/>
    default:
      return <></>;
  }
}
