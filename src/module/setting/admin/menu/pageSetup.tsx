import { EFieldType, EVariant, FormBuilder, TSection } from "@/component/formbuilder";
import { FormikHelpers, FormikValues } from "formik";

const PageSetup = () => {
  const initialValues = {
    pageLogo: '',
    pageTitle: ''
  };
  
  const onSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    //TODO: Need to implement API call
  };

  const sections: TSection[] = [
    {seq: 1, label: 'Admin Page Setup', expanded: true, fields: [
      {type: EFieldType.File, name: 'adminPageLogo', label: 'Admin Page Logo', options: { multiple: false }},
      {type: EFieldType.TextField, name: 'adminPageTitle', label: 'Admin Page Title'},
    ]}
  ];

  const formBuilderProps = {
    variant: EVariant.LabelOnLeft,
    formikConfig: { initialValues, onSubmit },
    sections
  }

  return (
    <FormBuilder {...formBuilderProps}/>
  );
}

export default PageSetup