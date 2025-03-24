import { useRef } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ThemeProvider,
  IconButton
} from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { IFormBuilderProps, EFieldType, EVariant, FormBuilder } from '@/component/formbuilder';
import { FormikValues } from 'formik';
import { showToast } from '@/function/showToast';
import theme from './theme';
import "@/amplifyConfigure"
import { createMemberGroup, deleteMemberGroup } from '@/function/amplify/rest/member';


interface IMemberGroupDialogProps {
  open: boolean;
  groupName: string;
  onClose: () => void;
  onCreated: () => void;
}

const MemberGroupDialog = ({ open, groupName, onClose, onCreated }: IMemberGroupDialogProps) => {
  const editMode = !!groupName;
  const originalGroupName = groupName;
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleSubmit = async (values: FormikValues) => {
    try {
      if (editMode) {
        if (values.groupName === originalGroupName) {
          return;
        } else if (originalGroupName !== 'ADMIN') {
          showToast("You can not modify ADMIN group", 'warning');
          return;
        } else if (values.groupName !== 'ADMIN') {
          showToast("You can not create ADMIN group", 'warning');
          return;
        }
        await deleteMemberGroup(originalGroupName);
      }
      await createMemberGroup(values.groupName);
      onCreated();
    } catch(error) {
      showToast(error, 'warning');
    }
  };

  const formBuilderProps: IFormBuilderProps = {
    variant: EVariant.Login,
    formikConfig: {
      initialValues: {
        groupName,
      },
      onSubmit: handleSubmit
    },
    sections: [{
      seq: 0,
      gap: '16px',
      fields: [
        {
          name: 'groupName',
          label: 'Group Name',
          type: EFieldType.TextField,
          required: true,
        },
      ],
    }],
    showSubmitButton: false,
    formRef: formRef,
  }

  const onSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Group Details
          <IconButton onClick={onClose}>
            <IoClose />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormBuilder {...formBuilderProps} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" fullWidth onClick={onSubmit} sx={{mt: 2}}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default MemberGroupDialog;