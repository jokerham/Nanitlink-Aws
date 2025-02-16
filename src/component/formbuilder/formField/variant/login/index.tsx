import { TFieldSetting } from "component/formbuilder/types";
import { Base } from "../base";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";

export const Login = (props: TFieldSetting) => {
  
  return (
    <ThemeProvider theme={theme}>
      <Base {...props}/>
    </ThemeProvider>
  );
}
