import { EFieldType, EVariant, FormBuilder, TSection } from '@/component/formbuilder';
import { gqGetBoard } from '@/function/amplify/graphql/post/gqGetBoard';
import { gqUpdateBoard } from '@/function/amplify/graphql/post/gqUpdateBoard';
import { showToast } from '@/function/showToast';
import { FormikValues } from 'formik';
import { useEffect, useState } from 'react';

type TBoardInfo = {
  id: string,
  name: string,
  description: string,
  rowsPerPage: number,
  headerText: string,
  footerText: string,
}

const initialValues: TBoardInfo = {
  id: '',
  name: '',
  description: '',
  rowsPerPage: 20,
  headerText: '',
  footerText: ''
}

const sections: TSection[] = [
  {
    seq: 0,
    gap: '0px',
    fields: [
      { name: 'id', label: 'ID', type: EFieldType.Hidden, required: true },
      { name: 'name', label: 'Name', type: EFieldType.TextField, required: true, disabled: false },
      { name: 'description', label: 'Description', type: EFieldType.TextArea, required: false },
      { name: 'rowsPerPage', label: 'Rows Per Page', type: EFieldType.TextField, required: true },
      { name: 'headerText', label: 'Header Text', type: EFieldType.TextArea, required: false },
      { name: 'footerText', label: 'Footer Text', type: EFieldType.TextArea, required: false }
    ]
  }
]

interface IBoardInfoProps {
  id: string
}

const BoardInfo = ({id}: IBoardInfoProps) => {
  const [values, setValues] = useState<FormikValues>(initialValues);

  const onSumbitHandler = async(values:FormikValues) => {
    const updatedBoard = await gqUpdateBoard(values as TBoardInfo);
    if (updatedBoard) {
      showToast("Board Info saved successfully", "success");
    }
  }

  const [formikConfig, setFormikConfig] = useState({initialValues, onSubmit: onSumbitHandler});

  useEffect(() => {
    gqGetBoard(id).then((board) => {
      setValues({
        id: board.id,
        name: board.name,
        description: board.description || '',
        rowsPerPage: board.rowsPerPage?.toString() || 10,
        headerText: board.headerText || '',
        footerText: board.footerText || ''
      });
    })
  }, [id]);

  useEffect(() => {
    setFormikConfig({initialValues: values as TBoardInfo, onSubmit: onSumbitHandler})
  }, [values])
  
  return (
    <FormBuilder 
      variant={EVariant.LabelOnLeft} 
      formikConfig={formikConfig}
      sections={sections}/>
  );
}

export default BoardInfo;
