import { Box, Divider, Link, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ColumnBox, RowBox } from 'component/customMui';
import { FiExternalLink } from "react-icons/fi";
import { FaCircleChevronRight } from 'react-icons/fa6';
import React, { Fragment } from 'react';
import { IMenu } from './types';
import { sxStyles } from './styles';

interface IMenuProps {
  node: IMenu,
  onAddMenu: () => void,
  onEditNode: (node: IMenu) => void,
  onCut: (node: IMenu) => void,
  onPaste: (node: IMenu) => void,
  onDelete: (node: IMenu) => void,
  onSetHomepage: (node: IMenu) => void,
  onMenuLinkImage: (node: IMenu) => void,
  onDesign: (node: IMenu) => void,
  onPermission: (node: IMenu) => void,
  onFullSettings: (node: IMenu) => void,
}

const Menu: React.FC<{ node: IMenu }> = ({ node }) => {
  const actionMenus = [
    {name: 'General Settings', icon: true, action: () => {}, divide: true},
    {name: 'Add Menu Item', icon: true, action: () => {}, divide: true},
    {name: 'Cut', icon: false, action: () => {}, divide: false},
    {name: 'Copy', icon: false, action: () => {}, divide: false},
    {name: 'Paste', icon: false, action: () => {}, divide: false},
    {name: 'Delete', icon: false, action: () => {}, divide: true},
    {name: 'Set as Homepage', icon: false, action: () => {}, divide: true},
    {name: 'Menu Link Image', icon: true, action: () => {}, divide: true},
    {name: 'Design', icon: true, action: () => {}, divide: true},
    {name: 'Permission', icon: true, action: () => {}, divide: true},
    {name: 'Full Settings', icon: true, action: () => {}, divide: true},
  ];

  return (
    <ColumnBox sx={sxStyles.edit}>
      <RowBox sx={sxStyles.header}>
        <Typography variant='h1' sx={sxStyles.h1}>{node.name}</Typography>
        <Link href={node.navigateTo}>
          <FiExternalLink />
        </Link>
      </RowBox>
      <ColumnBox sx={sxStyles.content}>
        <Box>
          <Typography variant='h4' sx={sxStyles.h4}>
            <b>Menu Type:</b> Board
          </Typography>
        </Box>
        <Divider />
        <List sx={{m:0, p:0}}>
          {actionMenus.map((actionMenu, index) => (
            <Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton sx={sxStyles.listItemButton} onClick={actionMenu.action}>
                  <ListItemText primary={actionMenu.name} slotProps={sxStyles.ListItemText}/>
                  {actionMenu.icon && <FaCircleChevronRight/>}
                </ListItemButton>
              </ListItem>
              {actionMenu.divide && <Divider />}
            </Fragment>
          ))}
        </List>
      </ColumnBox>
    </ColumnBox>
  );
};

export default Menu;