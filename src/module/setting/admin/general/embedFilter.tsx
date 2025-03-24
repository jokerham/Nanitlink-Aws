import { FormBuilder } from "@/component/formbuilder";
import { EFieldType, EVariant, TSection } from "@/component/formbuilder/types";
import { FormikHelpers, FormikValues } from "formik";

const EmbedFilter = () => {
  const initialValues = {
    iframe: '',
    objectEmbed: ''
  };
  
  const onSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    //TODO: Need to implement API call
  };

  const sections = [
    {seq: 1, label: 'embed Filter', fields: [
      {type: EFieldType.TextArea, name: 'iframe', label: 'iFrame'},
      {type: EFieldType.TextArea, name: 'objectEmbed', label: 'Object/Embed'}
    ]}
  ] as TSection[];

  const formBuilderProps = {
    variant: EVariant.LabelOnLeft,
    formikConfig: { initialValues, onSubmit },
    sections
  }

  return (
    <FormBuilder {...formBuilderProps}/>
  );
}

export default EmbedFilter