import { EFieldType, TFieldSetting } from "component/formbuilder/types";
import { FormTextField } from "./FormTextField";
import { FormSelect } from "./formSelect";

export const Default = (props: TFieldSetting) => {
  switch (props.type) {
    case EFieldType.TextField:
      return <FormTextField {...props}/>
    case EFieldType.Select:
      return <FormSelect {...props}/>
    default:
      return <></>;
  }
}
