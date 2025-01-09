import { EVariant, IFormFieldProps } from "../types";
import { Default } from "./variant/default";
import { LabelOnLeft } from "./variant/labelOnLeft";

const Variant = (fieldProps: IFormFieldProps) => {
  switch (fieldProps.variant) {
    case EVariant.LabelOnLeft:
      return <LabelOnLeft {...fieldProps.fieldSetting}/>
    case EVariant.Default:
      return <Default {...fieldProps.fieldSetting}/>;
    default:
      return <></>;
  }
}

export default Variant;
