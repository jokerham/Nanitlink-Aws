import { EFieldType, EVariant, FormBuilder, TSection } from "component/formbuilder";
import { FormikHelpers, FormikValues } from "formik";

const SiteLock = () => {
  const initialValues = {
    siteLockEnable: 'false',
    allowedAccessIp: '',
    signTitle: '',
    signContent: '',
  };
  
  const onSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    //TODO: Need to implement API call
  };

  const sections = [
    {seq: 1, label: 'Site Lock', fields: [
      {type: EFieldType.Radio, name: 'siteLockEnable', label: 'Enable Site Lock', 
        options: { data: [
          {value: 'true', label: 'Yes'},
          {value: 'false', label: 'No'}
        ]}
      },
      {type: EFieldType.TextArea, name: 'allowedAccessIp', label: 'IPs allowed to access'},
      {type: EFieldType.TextField, name: 'signTitle', label: 'Sign Title'},
      {type: EFieldType.TextArea, name: 'signContent', label: 'Sign Content'}
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

export default SiteLock;