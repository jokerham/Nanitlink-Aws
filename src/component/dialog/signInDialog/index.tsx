import { useRef } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ThemeProvider,
  IconButton,
  ButtonGroup
} from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { IFormBuilderProps, EFieldType, EVariant, FormBuilder } from '@/component/formbuilder';
import { FormikValues } from 'formik';
import { FaQuestionCircle, FaUserPlus } from 'react-icons/fa';
import theme from './theme';
import { useNavigate } from 'react-router';
import { signIn } from 'aws-amplify/auth';
import "@/amplifyConfigure"
import { showToast } from '@/function/showToast';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const SignInDialog = ({ open, onClose }: LoginDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  //const [signInResult, setSignInResult] = useState<SignInOutput | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (values: FormikValues) => {
    try {
      await signIn({
        username: values.username, 
        password: values.password
      });
      onClose();
    } catch (error) {
      showToast(error, "warning");
    }
  };

  const formBuilderProps: IFormBuilderProps = {
    variant: EVariant.Login,
    formikConfig: {
      initialValues: {
        username: '',
        password: '',
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
          type: EFieldType.TextField,
          required: true,
        },
        {
          name: 'password',
          label: 'Password',
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

  const signUp = () => {
    onClose();
    navigate('/member/signUp');
  }

  const resetPassword = () => {
    onClose();
    navigate('/member/resetPassword');
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Sign In
          <IconButton onClick={onClose}>
            <IoClose />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormBuilder {...formBuilderProps} />
          <Button variant="contained" fullWidth onClick={onSubmit} sx={{mt: 2}}>
            Sign In
          </Button>
        </DialogContent>
        <DialogActions>
          <ButtonGroup variant="contained" fullWidth>
            <Button startIcon={<FaUserPlus/>} onClick={signUp}>Sign Up</Button>
            <Button startIcon={<FaQuestionCircle/>} onClick={resetPassword}>Reset Password</Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default SignInDialog;