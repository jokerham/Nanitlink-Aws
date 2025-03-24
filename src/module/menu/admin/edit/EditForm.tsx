import { IMenu } from './types';
import Tab from './Tab';
import { EFieldType, EVariant, FormBuilder, IFormBuilderProps } from '@/component/formbuilder';
import { FormikValues } from 'formik';
import { RowBox } from '@/component/customMui';
import { ContainedButton, ContainedGrayButton } from './Components';
import { useRef } from 'react';

export interface IEditFormProps {
  node: IMenu,
  onClose: () => void,
  onSubmitHandler: (values: FormikValues) => void,
}

const EditForm = ({ node, onClose, onSubmitHandler }: IEditFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialValues = {
    id: node.id,
    name: node.name,
    moduleId: node.moduleId,
  }

  const formBuilderProps: IFormBuilderProps = {
    variant: EVariant.SmallSize,
    formikConfig: {
      initialValues: initialValues,
      onSubmit: onSubmitHandler,
    },
    sections: [
      {
        seq: 0,
        fields: [
          { name: 'id', label: 'ID', type: EFieldType.Hidden, },
          { name: 'name', label: 'Name', type: EFieldType.TextField, },
          { name: 'moduleId', label: 'Module Id', type: EFieldType.TextField, },
        ]
      }
    ],
    formRef: formRef,
    showSubmitButton: false
  }

  const onSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }

  return (
    <Tab
      title='General Setting'
      onClose={onClose}
      contentComponent={
        <FormBuilder {...formBuilderProps}/>
      }
      actionComponent={
        <RowBox sx={{justifyContent: 'space-between', width: '100%'}}>
          <ContainedGrayButton onClick={onClose}>Cancel</ContainedGrayButton>
          <ContainedButton onClick={onSubmit}>Submit</ContainedButton>
        </RowBox>
      }
    />
  );
};

export default EditForm;