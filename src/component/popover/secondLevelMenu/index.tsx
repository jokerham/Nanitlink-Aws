import { Popover, List, ListItemButton, ListItemText, ThemeProvider } from "@mui/material";
import { NavLink } from "react-router-dom";
import { IMenu } from "module/menu/admin/edit/types";
import theme from './theme'

interface SecondLevelMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  menuItems: IMenu[];
}

const SecondLevelMenu = ({ anchorEl, open, onClose, menuItems }: SecondLevelMenuProps) => {

  return (
    <ThemeProvider theme={theme}>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={index}
              component={NavLink}
              to={item.link ?? "#"}
              onClick={onClose}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </ThemeProvider>
  );
};

export default SecondLevelMenu;