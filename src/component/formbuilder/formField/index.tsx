import { EVariant, IFormFieldProps } from "../types";
import { Default } from "./variant/default";
import { LabelOnLeft } from "./variant/labelOnLeft";
import { Login } from "./variant/login";
import { SmallSize } from "./variant/smallSize";

const Variant = (fieldProps: IFormFieldProps) => {
  switch (fieldProps.variant) {
    case EVariant.LabelOnLeft:
      return <LabelOnLeft {...fieldProps.fieldSetting}/>;
      case EVariant.SmallSize:
        return <SmallSize {...fieldProps.fieldSetting}/>;
      case EVariant.Login:
        return <Login {...fieldProps.fieldSetting}/>;
      case EVariant.Default:
        return <Default {...fieldProps.fieldSetting}/>;
    default:
      return <></>;
  }
}

export default Variant;
