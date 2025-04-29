import { EFieldType, EVariant, FormBuilder, IFormBuilderProps } from "@/component/formbuilder";
import { gqAddCateogry } from "@/function/amplify/graphql/post/gqAddCategoty";
import { useNavigate } from "react-router";

interface IAddProps {
  id: string;
}

const Add = ({id: boardId}:IAddProps) => {
  const navigate = useNavigate();
  const formbuilderProps: IFormBuilderProps = {
    variant: EVariant.LabelOnLeft,
    sections: [
      {
        seq: 0,
        gap: '0px',
        fields: [
          { name: 'boardId', label: 'Board Id', type: EFieldType.Hidden},
          { name: 'name', label: 'Name', type: EFieldType.TextField, required: true }
        ]
      }
    ],
    formikConfig: {
      initialValues: {
        boardId,
        name: ''
      },
      onSubmit: async (values) => {
        try {
          const result = await gqAddCateogry({
            name: values.name,
            boardId: values.boardId
          });
          if (result) {
            navigate(`/board/configure/${values.boardId}/category/list`)
          }
        } catch (error) {
          console.error('Error adding category:', error);
        }
      }
    }
  }
  return (
    <FormBuilder {...formbuilderProps} />
  );
}

export default Add;
