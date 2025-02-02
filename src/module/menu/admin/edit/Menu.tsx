import { Box, Divider, List, ListItem } from '@mui/material';
import { FiExternalLink } from "react-icons/fi";
import { FaCircleChevronRight } from 'react-icons/fa6';
import { Fragment } from 'react';
import { IMenuProps, TNodeFunction, TGeneralFunction } from './types';
import Tab from './Tab';
import { BaseTypography, SettingButton, SettingText } from './Components';

const Menu = ({ 
  node, 
  onEditNode,
  onAddMenu,
  onCut,
  onCopy,
  onPaste,
  onDelete,
  onSetHomepage,
  onMenuLinkImage,
  onDesign,
  onPermission,
  onFullSettings,
  onClose
}: IMenuProps) => {

  const actionMenus = [
    {name: 'General Settings', icon: true, action: onEditNode, divide: true},
    {name: 'Add Menu Item', icon: true, action: onAddMenu, divide: true},
    {name: 'Cut', icon: false, action: onCut, divide: false},
    {name: 'Copy', icon: false, action: onCopy, divide: false},
    {name: 'Paste', icon: false, action: onPaste, divide: false},
    {name: 'Delete', icon: false, action: onDelete, divide: true},
    {name: 'Set as Homepage', icon: false, action: onSetHomepage, divide: true},
    {name: 'Menu Link Image', icon: true, action: onMenuLinkImage, divide: true},
    {name: 'Design', icon: true, action: onDesign, divide: true},
    {name: 'Permission', icon: true, action: onPermission, divide: true},
    {name: 'Full Settings', icon: true, action: onFullSettings, divide: true},
  ];

  const onClickHandler = (action: TNodeFunction | TGeneralFunction) => {
    if (action.length === 1) {
      const nodeAction = action as TNodeFunction;
      nodeAction(node);
    } else {
      const generalAction = action as TGeneralFunction;
      generalAction();
    }
  }

  return (
    <Tab
      title={node.name}
      titleIcon={<FiExternalLink/>}
      titleIconHref={node.navigateTo}
      onClose={onClose}
      contentComponent={
        <Fragment>
          <Box>
            <BaseTypography>
              <b>Menu Type:</b> Board
            </BaseTypography>
          </Box>
          <Divider />
          <List sx={{m:0, p:0}}>
            {actionMenus.map((actionMenu, index) => (
              <Fragment key={index}>
                <ListItem disablePadding>
                  <SettingButton onClick={() => onClickHandler(actionMenu.action)}>
                    <SettingText primary={actionMenu.name} />
                    {actionMenu.icon && <FaCircleChevronRight/>}
                  </SettingButton>
                </ListItem>
                {actionMenu.divide && <Divider />}
              </Fragment>
            ))}
          </List>
        </Fragment>
      } 
    />
  );
};

export default Menu;