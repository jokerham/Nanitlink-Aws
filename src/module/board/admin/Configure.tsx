import { RowBox } from '@/component/customMui';
import { Section, SectionContent, SectionTitle } from '@/component/Section';
import TabPage from '@/component/tabPage';
import { Box, Typography } from '@mui/material';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { NavLink } from 'react-router';
import './style.scss';
import BoardInfo from './BoardInfo';
import Category from './category';
import UserDefined from './userDefined';

interface IConfigureProps {
  id: string
}

const Configure = ({id}: IConfigureProps) => {
  const tabPages = [
    { id: 'info', title: 'Board Info', component: <BoardInfo id={id}/> },
    { id: 'category', title: 'Categories', component: <Category id={id}/>},
    { id: 'userdefined', title: 'User Defined', component: <UserDefined id={id}/> },
    { id: 'permission', title: 'Permission', component: <div>Permission</div> },
    { id: 'additionalSetup', title: 'Additional Setup', component: <div>Additional Setup</div> },
  ];

  return (
    <Section expanded={true}>
      <SectionTitle expandable={false}>
        <RowBox className="titleRow">
          <Typography variant='h2' className="titleText">Board Management</Typography>
          <Box className="arrowIcon">
            <MdOutlineKeyboardArrowRight />
          </Box>
          <Typography variant='h4' component={NavLink} className="boardLink" to={`/board/${id}`}>
            {id}
          </Typography>
        </RowBox>
      </SectionTitle>
      <SectionContent>
        <TabPage tabPages={tabPages} />
      </SectionContent>
    </Section>
  );
}

export default Configure;
