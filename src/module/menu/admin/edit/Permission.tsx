import { IMenu } from './types';
import Tab from './Tab';
import { EFieldType, EVariant, FormBuilder, FormBuilderHandle, IFormBuilderProps } from 'component/formbuilder';
import { FormikValues } from 'formik';
import { RowBox } from 'component/customMui';
import { ContainedButton, ContainedGrayButton } from './Components';
import { useRef } from 'react';
import { permission } from 'process';
import { dir } from 'console';

interface IPermissionFormProps {
  node: IMenu,
  onClose: () => void,
  onSubmitHandler: (values: FormikValues) => void,
}

const initialValues = {
  viewMenu: 'all',
  access: 'all',
  list: 'all',
  view: 'all',
  writeDocument: 'login',
  writeComment: 'login',
  readQA: 'admin',
  management: 'admin',
}

const permissionFields = [
  { name: 'viewMenu', label: 'Target of view menu' },
  { name: 'access', label: 'Access' },
  { name: 'list', label: 'List' },
  { name: 'view', label: 'View' },
  { name: 'writeDocument', label: 'Write Document' },
  { name: 'writeComment', label: 'Write Comment' },
  { name: 'readQA', label: 'Read QA Document' },
  { name: 'management', label: 'Management' },
]

const permissionFieldOption = {
  data: [
    { label: 'All users', value: 'all' },
    { label: 'Login users', value: 'login' },
    { label: 'Administrator users', value: 'admin' },
    { label: 'Selected group users', value: 'group' },
  ]
};

const userGroups = [
  { label: 'Group 1', value: 'group1' },
  { label: 'Group 2', value: 'group2' },
  { label: 'Group 3', value: 'group3' },
];

const Permission = ({ node, onClose, onSubmitHandler }: IPermissionFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const formBuilderRef = useRef<FormBuilderHandle>(null);
  
  const onValueChanged = () => {
    const ref = formBuilderRef.current;
    let addIndex = 1;
    for (let index = 0; ref && index < permissionFields.length; index++) {
      const field = permissionFields[index];
      const permissionValue = ref.getFieldValue(field.name);
      const groupFieldName = `${field.name}_group`;
      const groupField = ref.getField(groupFieldName);

      if (permissionValue === 'group' && !groupField) {
        ref.addFieldToSection(0, { 
          name: groupFieldName, 
          label: `${field.label} Group`, 
          type: EFieldType.Checkbox, 
          options: {
            multiple: true, 
            sort: false, 
            direction: 'column', 
            data: userGroups
          }
        }, index + addIndex);
      }

      if (permissionValue !== 'group' && groupField) {
        ref.removeFieldFromSection(0, groupFieldName);
      }

      if (permissionValue === 'group') {
        addIndex++;
      }
    }
  };

  const formBuilderProps: IFormBuilderProps = {
    variant: EVariant.Default,
    formikConfig: {
      initialValues: initialValues,
      onSubmit: onSubmitHandler,
    },
    sections: [
      {
        seq: 0,
        fields: permissionFields.map((field) => ({
          ...field,
          type: EFieldType.Select,
          options: permissionFieldOption,
        }))
      }
    ],
    formRef: formRef,
    showSubmitButton: false,
    onValueChanged: onValueChanged,
  }

  const onSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }

  return (
    <Tab
      title='Permission'
      onClose={onClose}
      contentComponent={
        <FormBuilder ref={formBuilderRef} {...formBuilderProps}/>
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

export default Permission;