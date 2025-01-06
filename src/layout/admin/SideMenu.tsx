import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { FaHome, FaUser, FaCog, FaStar, FaListUl, FaFileAlt, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io'
import { useNavigate } from 'react-router';

interface IMenu {
  id: string,
  name: string,
  icon?: React.ReactNode,
  children?: IMenu[],
  navigateTo?: string,
  onClickAction?: (menu: IMenu) => void,
  active?: boolean,
};

const SideMenu = () => {
  // State to track expanded accordions
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  // State to track collapsea
  const [collapsed, setCollapsed] = useState(false); 
  const navigate = useNavigate();

  const menuData = [
    { id: 'dashboard', name: 'Dashboard', icon: <FaHome />, children: [], active: true},
    { id: 'menu', name: 'Menu', icon: <FaListUl />, children: [
      { id: 'menu-editor', name: 'Menu Editor' },
      { id: 'site-design', name: 'Site Design' },
      { id: 'layouts', name: 'Layouts' }, ], },
    { id: 'member', name: 'Member', icon: <FaUser />, children: [
      { id: 'member-list', name: 'Member List' },
      { id: 'member-setting', name: 'Member Setting' },
      { id: 'member-group', name: 'Member Group' },
      { id: 'member-point', name: 'Point' }, ], },
    { id: 'content', name: 'Content', icon: <FaFileAlt />, children: [
      { id: 'document', name: 'Document' },
      { id: 'comment', name: 'Comment' },
      { id: 'file', name: 'File' },
      { id: 'poll', name: 'Poll' },
      { id: 'language', name: 'Multilingual' },
      { id: 'trash', name: 'Trash' },
      { id: 'spam', name: 'SpamFilter' }, ], },
    { id: 'favorite', name: 'Favorite', icon: <FaStar />, children: [
      // { id: '', name: '' } 
    ], },
    { id: 'settings', name: 'Settings', icon: <FaCog />, children: [
      { id: 'setting-general', name: 'General' },
      { id: 'admin-menu', name: 'Admin Setup' },
      { id: 'setting-file', name: 'File Uplaod' }, ], },
    { id: 'advanced', name: 'Advanced', icon: <FaCog />, children: [
      // { id: '', name: '' },
    ], },
  ] as IMenu[];

  const isActive = (active: boolean) => (active ? 'active' : '');

  // Toggle Expand Icon
  const expandIcon = (menu: IMenu) => {
    return (
      (menu.children?.length ?? 0) > 0 ?
        <IoIosArrowDown /> : null); 
  };

  // Collapse/Expand Accordion
  const handleAccordionChange = (menu: IMenu) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    console.log(menu.id, menu.children?.length);
    if ((menu.children?.length ?? 0) > 0) {
      setExpandedMenus((prevExpanded) =>
        prevExpanded.includes(menu.id)
          ? prevExpanded.filter((id) => id !== menu.id) // Collapse if already expanded
          : [...prevExpanded, menu.id] // Expand if not already expanded
      );
    }
  };

  useEffect(() => {
    if (expandedMenus.length > 0) {
      setCollapsed(false);
    };
  }, [expandedMenus])

  // Collapse/Expand Menu
  const toggleMenu = () => {
    setCollapsed(!collapsed);
    setExpandedMenus([]); // Close all accordions when collapsing
  };

  const onClick = (menu: IMenu) => {
    if (menu.navigateTo) {
      navigate(menu.navigateTo);
      return;
    }
    if (menu.onClickAction) {
      menu.onClickAction(menu);
      return;
    }
  }
  
  return (
    <Box>
      <Box sx={{ 
        display: 'inline-block', 
        width: collapsed ? 40 : 180, 
        p: '2px', 
        borderRadius: '5px', 
        boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.2)', 
        position: 'relative' }}>
        {menuData.map((menu) => (
          <Accordion 
            key={menu.id} 
            disableGutters
            className={isActive(menu.active ?? false)}
            expanded={expandedMenus.includes(menu.id)}
            onChange={handleAccordionChange(menu)}>
            <AccordionSummary expandIcon={!collapsed && expandIcon(menu)} onClick={() => {onClick(menu)}}>
              <ListItemIcon>
                {menu.icon}
              </ListItemIcon>
              { !collapsed && <ListItemText primary={menu.name} sx={{ml: '16px'}}/> }
            </AccordionSummary>
            {(menu.children?.length ?? 0) > 0 && (
              <AccordionDetails>
                <List>
                  {menu.children?.map((child) => (
                    <ListItem key={child.id} onClick={() => {onClick(menu)}}>
                      <ListItemText primary={child.name} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            )}
          </Accordion>
        ))}

        {/* Toggle Button */}
        <IconButton
          onClick={toggleMenu}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '-10px',
            transform: 'translateY(-50%)',
            height: '50px', // Set the height
            width: '10px', // Set the width
            borderRadius: '0 5px 5px 0', // Right border-radius
            backgroundColor: '#ffffff',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          {collapsed ? <FaChevronRight size={8} /> : <FaChevronLeft size={8} />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default SideMenu;