import { Box } from "@mui/material";
import './style.scss';
import { NavLink, useParams } from "react-router";

type TTabPage = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  component: React.ReactNode;
}

interface ITabPageProps {
  tabPages: TTabPage[];
}

const TabPage = (props: ITabPageProps) => {
  const { module, action, id, tabPage } = useParams();
  const { tabPages } = props;

  return (
    <Box>
      <Box className="tab-header">
        {tabPages.map((tab) => {
          const isActive = tab.id === tabPage;
          const tabClassName = isActive ? "tab-item active" : "tab-item"
          return (
            <Box component={NavLink} to={`/${module}/${action}/${id}/${tab.id}`} key={tab.id} className={tabClassName}>
              {tab.icon} {tab.title}
            </Box>
          );
        })}
      </Box>
      <Box className="tab-content">
        {tabPages.find((tab) => tab.id === tabPage)?.component}
      </Box>
    </Box>
  );
}

export default TabPage;
