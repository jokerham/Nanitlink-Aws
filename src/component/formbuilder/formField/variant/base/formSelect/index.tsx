import { TFieldSetting } from "component/formbuilder/types"
import { MultiSelect } from "./MultiSelect"
import { SingleSelect } from "./SingleSelect"

export const FormSelect = (props: TFieldSetting) => {
  return (
    (props.multiple ?
      <MultiSelect {...props}/> :
      <SingleSelect {...props}/>
    )
  )
}
