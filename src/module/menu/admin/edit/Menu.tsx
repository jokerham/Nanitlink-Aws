import { Link, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ColumnBox, RowBox } from 'component/customMui';
import { FiExternalLink } from "react-icons/fi";
import React from 'react';
import { IMenu } from './types';
import { sxStyles } from './styles';

const Menu: React.FC<{ node: IMenu }> = ({ node }) => {
  return (
    <ColumnBox sx={sxStyles.edit}>
      <RowBox sx={sxStyles.header}>
        <Typography variant='h1' sx={sxStyles.h1}>{node.name}</Typography>
        <Link href={node.navigateTo}>
          <FiExternalLink />
        </Link>
      </RowBox>
      <ColumnBox sx={sxStyles.content}>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={sxStyles.listItemButton}>
              <ListItemText
                primary="General Setting"
                slotProps={sxStyles.ListItemText}/>
            </ListItemButton>
          </ListItem>
        </List>
      </ColumnBox>
    </ColumnBox>
  );
};

export default Menu;