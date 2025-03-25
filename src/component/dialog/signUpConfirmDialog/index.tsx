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
import { confirmSignUp, ConfirmSignUpOutput } from 'aws-amplify/auth';
import { showToast } from '@/function/showToast';
import theme from './theme';
import "@/amplifyConfigure"


interface SignUpConfirmDialogProps {
  open: boolean;
  username: string;
  onClose: () => void;
  onConfirmSignUp: (result: ConfirmSignUpOutput) => void;
}

const SignUpConfirmDialog = ({ open, username, onClose, onConfirmSignUp }: SignUpConfirmDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleSubmit = async (values: FormikValues) => {
    try {
      const result = await confirmSignUp({
        username: values.username,
        confirmationCode: values.verificationCode
      })
      onConfirmSignUp(result);
    } catch(error) {
      showToast(error, 'warning');
    }
  };

  const formBuilderProps: IFormBuilderProps = {
    variant: EVariant.Login,
    formikConfig: {
      initialValues: {
        username,
        verificationCode: '',
      },
      onSubmit: handleSubmit
    },
    sections: [{
      seq: 0,
      gap: '16px',
      fields: [
        {
          name: 'username',
          label: 'Username',
          type: EFieldType.Hidden,
          required: true,
        },
        {
          name: 'verificationCode',
          label: 'Verification Code',
          type: EFieldType.Password,
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
          Sign Up Confirmation
          <IconButton onClick={onClose}>
            <IoClose />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormBuilder {...formBuilderProps} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" fullWidth onClick={onSubmit} sx={{mt: 2}}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default SignUpConfirmDialog;