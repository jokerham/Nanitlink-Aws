import { EFieldType, EVariant, FormBuilder, TSection } from "component/formbuilder";
import { FormikHelpers, FormikValues } from "formik";

const Primary = () => {
  const initialValues = {
    title: '', language: ''
  };
  
  const onSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {

  };

  const sections = [
    {seq: 1, label: 'Primary', fields: [
      {type: EFieldType.TextField, name: 'title', label: 'Title'},
      {type: EFieldType.Select, name: 'language', lable: 'Default Language', options: {
        multiple: false,
        data: [
          {value: 'en', label: 'English'},
          {value: 'ko', label: 'Korean'}
        ]
      }},
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

export default Primary