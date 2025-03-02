import { EFieldType, EVariant, FormBuilder, IFormBuilderProps, TFieldSetting, TSection } from 'component/formbuilder';
import { Section, SectionContent, SectionTitle } from 'component/Section';
import { FormikValues, FormikHelpers } from 'formik';
import { getMemberDetail } from 'function/amplify/rest/member';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

// Initial form values
const initialValues = {
  userid: '',
  password: '',
  name: '',
  email: '',
  username: '',
  nickname: '',
  homepage: '',
  birthday: '',
  profile: '',
  mailing: 'no',
  message: 'all',
  approved: 'true',
  group: [''],
};

// Form field configuration
const sectionZeroFields: TFieldSetting[] = [
  { name: 'userid', label: 'User ID', type: EFieldType.TextField, disabled: true },
  { name: 'password', label: 'Password', type: EFieldType.Password, required: true },
  { name: 'email', label: 'Email', type: EFieldType.TextField, required: true },
  { name: 'username', label: 'User Name', type: EFieldType.TextField, required: true },
  { name: 'nickname', label: 'Nick Name', type: EFieldType.TextField, required: true },
  { name: 'homepage', label: 'Homepage', type: EFieldType.TextField },
  { name: 'profile', label: 'Profile Image', type: EFieldType.File, options: { multiple: false } },
  { name: 'mailing', label: 'Join Mailing', type: EFieldType.Radio, options: { data: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ]}},
  { name: 'message', label: 'Receive Message', type: EFieldType.Radio, options: { data: [
    { value: 'all', label: 'Receive all' },
    { value: 'friends', label: 'Only friends' },
    { value: 'reject', label: 'Reject all' },
  ]}},
  { name: 'approved', label: 'Status', type: EFieldType.Radio, options: { data: [
    { value: 'true', label: 'Approved' },
    { value: 'false', label: 'Denied' },
  ]}},
  { name: 'group', label: 'Group', type: EFieldType.Checkbox, options: { multiple: true, data: [
    { value: 'admin', label: 'Admin' },
    { value: 'guest', label: 'Guest' },
  ]}},
];

const sections: TSection[] = [{ seq: 0, fields: sectionZeroFields }];

const Detail = () => {
  const [searchParams] = useSearchParams();
  const userid = searchParams.get("userid");

  // Form submission handler
  const onSubmit = useCallback((values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    // Handle form submission logic
  }, []);

  // State for FormBuilder props
  const [formBuilderProps, setFormBuilderProps] = useState<IFormBuilderProps>({
    variant: EVariant.LabelOnLeft,
    formikConfig: { initialValues, onSubmit },
    sections,
  });

  // Fetch and update user details
  useEffect(() => {
    const fetchMemberDetails = async () => {
      if (!userid) return;
      const { user } = await getMemberDetail(userid);
      if (!user) return;

      setFormBuilderProps(prevProps => ({
        ...prevProps,
        formikConfig: {
          ...prevProps.formikConfig,
          initialValues: {
            ...initialValues,
            userid: user.userName,
            name: user.name,
            email: user.email,
            username: user.userName,
            nickname: user.nickName,
            birthday: user.birthday,
            mailing: user.mailing,
          },
        },
      }));
    };

    fetchMemberDetails();
  }, [userid]);

  return (
    <Section defaultExpanded={true}>
      <SectionTitle>User Info Detail</SectionTitle>
      <SectionContent>
        <FormBuilder {...formBuilderProps} />
      </SectionContent>
    </Section>
  );
};

export default Detail;