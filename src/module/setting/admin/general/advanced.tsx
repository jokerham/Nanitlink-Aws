import { EFieldType, EVariant, FormBuilder, TSection } from "@/component/formbuilder";
import { FormikHelpers, FormikValues } from "formik";

const Advanced = () => {
  const initialValues = {
    adminAccessIp: '',
    defaultUrl: '',
  };
  
  const onSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    //TODO: Need to implement API call
  };

  const sections = [
    {seq: 1, label: 'Advanced', fields: [
      {type: EFieldType.TextArea, name: 'adminAccessIp', label: 'Sepcify IP address band that can access the admin page.'},
      {type: EFieldType.TextField, name: 'defaultUrl', label: 'Default URL'}
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

export default Advanced