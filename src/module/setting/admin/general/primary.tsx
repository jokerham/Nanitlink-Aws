import { EFieldType, EVariant, FormBuilder, TSection } from "component/formbuilder";
import { FormikHelpers, FormikValues } from "formik";

const Primary = () => {
  const initialValues = {
    title: '',
    supportingLanguage: {
      'en': true,
      'jp': false,
      'ko': false,
    },
    defaultLanguage: ''
  };
  
  const onSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    //TODO: Need to implement API call
  };

  const sections = [
    {seq: 1, label: 'Primary', expanded: true, fields: [
      {type: EFieldType.TextField, name: 'title', label: 'Title'},
      {type: EFieldType.Checkbox, name: 'supportingLanguage', label: 'Supporting Languages', options: {
        data: [
          {value: 'en', label: 'English'},
          {value: 'jp', label: '日本語'},
          {value: 'ko', label: '한국어'}
        ]
      }},
      {type: EFieldType.Select, name: 'defaultLanguage', label: 'Default Language', options: {
        multiple: false, data: [
          {value: 'en', label: 'English'},
          {value: 'jp', label: '日本語'},
          {value: 'ko', label: '한국어'}
        ]
      }}
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