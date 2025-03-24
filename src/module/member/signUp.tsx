import { Fragment, useEffect, useState } from "react";
import { EFieldType, EVariant, FormBuilder, IFormBuilderProps, TSection } from "@/component/formbuilder";
import { FormikValues } from "formik";
import { showToast } from "@/function/showToast";
import SignUpConfirmDialog from "@/component/dialog/signUpConfirmDialog";
import { useNavigate } from "react-router";
import { signUp, signIn, SignUpOutput, SignInOutput, ConfirmSignUpOutput } from 'aws-amplify/auth';
import "amplifyConfigure"

const SignUp = () => {
  const [signUpValues, setSignUpValues] = useState<FormikValues | null>(null);
  const [signUpResult, setSignUpResult] = useState<SignUpOutput | null>(null);
  const [signInResult, setSignInResult] = useState<SignInOutput | null>(null);
  const [signupConfirmResult, setSignupConfirmResult] = useState<ConfirmSignUpOutput | null>(null);
  const [signUpConfirmDialogOpen, setSignUpConfirmDialogOpen] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    nickname: '',
    birthday: '',
    profile: '',
    mailing: 'yes',
    messaging: 'all',
  };

  const onSubmit = async (values: FormikValues) => {
    setSignUpValues(values);
    try {
      if(values.password !== values.confirmPassword) {
        throw new Error('Password and Confirm Password are not same');
      }
      const result = await signUp({
        username: values.email,
        password: values.password,
        options: {
          userAttributes: {
            email: values.email,
            name: values.username,
            nickname: values.nickname,
            birthdate: values.birthday,
            'custom:mailing': values.mailing,
            'custom:messaging': values.messaging,
          }
        }
      });
      /**
       * REF : Standard attributes
       *       https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#cognito-user-pools-standard-attributes
       */
      setSignUpResult(result);
    } catch (error) {
      if (error instanceof TypeError) {
        showToast(error.message, "error");
      } else {
        console.error(error);
        showToast("An unexpected error occurred", "error");
      }
    }
  }

  const formikConfig = {
    initialValues,
    onSubmit,
  };

  const sections: TSection[] = [
    {
      seq: 0, label: 'Sign Up', expanded: true, gap: '0px', expandable: false,
      fields: [
        { name: "email", label: "Email", type: EFieldType.TextField, required: true, },
        { name: "password", label: "Password", type: EFieldType.Password, required: true, },
        { name: "confirmPassword", label: "Confirm Password", type: EFieldType.Password, required: true, },
        { name: "username", label: "User Name", type: EFieldType.TextField, required: true, },
        { name: "nickname", label: "Nick Name", type: EFieldType.TextField, required: false, },
        { name: "birthday", label: "Birthday", type: EFieldType.TextField, required: false, },
        { name: "profile", label: "Profile Image", type: EFieldType.File, required: false, options: { multiple: false } },
        { name: "mailing", label: "Join Mailing", type: EFieldType.Radio, required: false, options: {
          direction: 'row', data: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ], 
        }},
        { name: "messaging", label: "Allow Message", type: EFieldType.Radio, required: false, options: {
          direction: 'row', data: [
            { label: 'Allow All', value: 'all' },
            { label: 'Allow for Friend Only', value: 'friend' },
            { label: 'Reject All', value: 'reject' }
          ], 
        }}
      ],
    },
  ];
  
  const formBuilderProps: IFormBuilderProps = {
    variant: EVariant.LabelOnLeft,
    formikConfig,
    sections,
  }

  // Sign In Request
  const requestSignUp = async (username: string, password: string) => {
    const result = await signIn({
      username,
      password,
    });
    setSignInResult(result);
  }

  // Sign Up Result Check
  useEffect(() => {
    if (signUpResult && signUpValues) {
      if (signUpResult.isSignUpComplete) {
        requestSignUp(signUpValues.username, signUpValues.password);
      } else {
        switch (signUpResult.nextStep.signUpStep) {
          case "CONFIRM_SIGN_UP":
            setSignUpConfirmDialogOpen(true);
            break;
        }
      }

      /**
       * {
       *   isSignUpComplete: false,
       *   nextStep: {
       *     signUpStep: "CONFIRM_SIGN_UP",
       *     codeDeliveryDetails: {
       *       destination: "j***@g***",
       *       deliveryMedium: "EMAIL",
       *       attributeName: "email"
       *     }
       *   },
       *   userId: "24f89dfc-5041-709b-fd76-5997bb27d9a2"
       * }
       */
    }
  }, [signUpResult, signUpValues]);

  // Confirm Sign Up Result Check
  useEffect(() => {
    if (signupConfirmResult && signUpValues) {
      /**
       * {
       *   isSignUpComplete: true,
       *   nextStep: {
       *     signUpStep: "DONE"
       *   }
       * }
       */
      if (signupConfirmResult.isSignUpComplete) {
        requestSignUp(signUpValues.email, signUpValues.password);
      } else {
        console.log(setSignupConfirmResult);
      }
    }
  }, [signupConfirmResult, signUpValues]);

  // Confirm Sign In Check
  useEffect(() => {
    if (signInResult && signInResult.isSignedIn) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInResult]);

  const onCloseHandler = () => { 
    setSignUpConfirmDialogOpen(false) 
  }

  const onConfirmSignUpHandler = (result: ConfirmSignUpOutput) => { 
    setSignUpConfirmDialogOpen(false); 
    setSignupConfirmResult(result) 
  }

  return (
    <Fragment>
      <FormBuilder {...formBuilderProps}/>
      <SignUpConfirmDialog 
        open={signUpConfirmDialogOpen}
        username={signUpValues?.email} 
        onClose={onCloseHandler} 
        onConfirmSignUp={onConfirmSignUpHandler}
      />
    </Fragment>
  );
}

export default SignUp;

// Reference : https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/manage-user-profile/