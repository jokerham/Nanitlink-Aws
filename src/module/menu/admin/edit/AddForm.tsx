import { RowBox } from '@/component/customMui';
import { EFieldType, EVariant, FormBuilder, FormBuilderHandle, IFormBuilderProps, TFieldSetting } from '@/component/formbuilder';
import { FormikValues } from 'formik';
import { useRef } from 'react';
import { ContainedButton, ContainedGrayButton } from './Components';
import Tab from './Tab';

export interface IAddFormProps {
  parentId?: string;
  onClose: () => void;
  onSubmitHandler: (values: FormikValues) => void;
}

const initialFields: TFieldSetting[] = [
  { name: 'parentId', label: 'Parent Menu Id', type: EFieldType.Hidden },
  { name: 'module', label: 'Module', type: EFieldType.Select, options: {
    multiple: false, sort: true, data: [
      { label: 'Article', value: 'Article' },
      { label: 'Board', value: 'Board' },
      { label: 'Link', value: 'Link' },
    ]
  }},
  { name: 'name', label: 'Name', type: EFieldType.TextField },
  { name: 'moduleId', label: 'Module Id', type: EFieldType.TextField },
];

const urlFieldSetting: TFieldSetting = { name: 'url', label: 'URL', type: EFieldType.TextField };

const initialValues = {
  module: '',
  name: '',
  moduleId: '',
};

const AddForm = ({ parentId, onClose, onSubmitHandler }: IAddFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const formBuilderRef = useRef<FormBuilderHandle>(null);
  
  const onValueChanged = () => {
    const ref = formBuilderRef.current;
    if (ref) {
      const module = ref.getFieldValue('module');
      const urlField = ref.getField(urlFieldSetting.name);
      if (module === 'link' && !urlField) { ref.addFieldToSection(0, urlFieldSetting); }
      if (module !== 'link' && urlField) { ref.removeFieldFromSection(0, urlFieldSetting.name); }
    }
  };

  const formBuilderProps: IFormBuilderProps = {
    variant: EVariant.SmallSize,
    formikConfig: {
      initialValues: { parentId, ...initialValues },
      onSubmit: onSubmitHandler,
    },
    sections: [{ seq: 0, fields: initialFields }],
    formRef: formRef,
    showSubmitButton: false,
    onValueChanged: onValueChanged,
  };

  const onSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <Tab
      title="Add Menu Item"
      onClose={onClose}
      contentComponent={<FormBuilder ref={formBuilderRef} {...formBuilderProps} />}
      actionComponent={
        <RowBox sx={{ justifyContent: 'space-between', width: '100%' }}>
          <ContainedGrayButton onClick={onClose}>Cancel</ContainedGrayButton>
          <ContainedButton onClick={onSubmit}>Submit</ContainedButton>
        </RowBox>
      }
    />
  );
};

export default AddForm;