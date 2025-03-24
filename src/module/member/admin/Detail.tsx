import { EFieldType, EVariant, FormBuilder, IFormBuilderProps, TFieldSetting, TSection } from '@/component/formbuilder';
import { Section, SectionContent, SectionTitle } from '@/component/Section';
import { FormikValues, FormikHelpers } from 'formik';
import { getMemberDetail, getMemberGroupList } from '@/function/amplify/rest/member';
import { CognitoGroup } from '@/function/amplify/rest/member/types';
import { updateMember } from '@/function/amplify/rest/member/updateMember';
import { showToast } from '@/function/showToast';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Initial form values
const initialValues = {
  id: '',
  username: '',
  password: '',
  name: '',
  email: '',
  nickname: '',
  homepage: '',
  birthday: '',
  profile: '',
  mailing: 'no',
  messaging: 'all',
  group: [],
};

const Detail = () => {
  const { id: userid } = useParams<{ id?: string }>();
  const [groups, setGroups] = useState<CognitoGroup[]>([]);
  const [sections, setSections] = useState<TSection[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    getMemberGroupList().then((result) => setGroups(result.groups));
  }, []);

  useEffect(() => {
    // Form field configuration
    const sectionZeroFields: TFieldSetting[] = [
      { name: 'id', label: 'User ID', type: EFieldType.Hidden },
      { name: 'username', label: 'User Name', type: EFieldType.TextField, required: true },
      { name: 'name', label: 'Given Name', type: EFieldType.TextField, required: true },
      { name: 'password', label: 'Password', type: EFieldType.Password },
      { name: 'email', label: 'Email', type: EFieldType.TextField, required: true },
      { name: 'nickname', label: 'Nick Name', type: EFieldType.TextField, required: true },
      { name: 'homepage', label: 'Homepage', type: EFieldType.TextField },
      { name: 'profile', label: 'Profile Image', type: EFieldType.File, options: { multiple: false } },
      { name: 'mailing', label: 'Join Mailing', type: EFieldType.Radio, options: { direction: 'row', data: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]}},
      { name: 'messaging', label: 'Receive Message', type: EFieldType.Radio, options: { direction: 'row', data: [
        { value: 'all', label: 'Allow All' },
        { value: 'friend', label: 'Allow for Friend Only' },
        { value: 'reject', label: 'Reject All' },
      ]}},
      { name: 'group', label: 'Group', type: EFieldType.Checkbox, options: { multiple: true, sort: true, data:
        groups.map(group => { return { value: group.GroupName, label: group.GroupName }})
      }},
    ];

    const sections = [{ seq: 0, expanded: true, expandable: false, fields: sectionZeroFields }];
    setSections(sections);
  }, [groups])

  // Form submission handler
  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    try {
      await updateMember(values);
      navigate('/admin/member/list');
    } catch (error) {
      showToast(error, 'error');
    }
  };

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
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.userName,
            nickname: user.nickName,
            birthday: user.birthday,
            mailing: user.mailing,
            messaging: user.messaging,
            group: user.userGroups,
          },
        },
        sections,
      }));
    };

    if (sections.length > 0) {
      fetchMemberDetails();
    }
  }, [userid, sections]);

  return (
    <Section defaultExpanded={true}>
      <SectionTitle expandable={false}>User Info Detail</SectionTitle>
      <SectionContent>
        <FormBuilder {...formBuilderProps} />
      </SectionContent>
    </Section>
  );
};

export default Detail;