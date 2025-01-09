import { EFieldType, TFieldSetting } from "component/formbuilder/types";
import { FormTextField } from "./formTextField";

export const Default = (props: TFieldSetting) => {
  switch (props.type) {
    case EFieldType.TextField:
      return <FormTextField {...props}/>
    default:
      return <></>;
  }
}
