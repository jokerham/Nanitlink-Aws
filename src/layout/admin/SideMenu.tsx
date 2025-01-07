import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { FaHome, FaUser, FaCog, FaStar, FaListUl, FaFileAlt, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { FiTool } from "react-icons/fi";
import { IoIosArrowDown } from 'react-icons/io'
import { useNavigate, useLocation } from 'react-router';

interface IMenu {
  id: string,
  name: string,
  icon?: React.ReactNode,
  children?: IMenu[],
  navigateTo?: string,
  onClickAction?: (menu: IMenu) => void,
  active?: boolean,
};

const initialMenuData = [
  { id: 'dashboard', name: 'Dashboard', icon: <FaHome />, children: [], navigateTo: '/admin'},
  { id: 'menu', name: 'Menu', icon: <FaListUl />, children: [
    { id: 'menu-editor', name: 'Menu Editor', navigateTo: '/admin/menu' },
    { id: 'site-design', name: 'Site Design', navigateTo: '/admin/site' },
    { id: 'layouts', name: 'Layouts', navigateTo: '/admin/layout' }, ], },
  { id: 'member', name: 'Member', icon: <FaUser />, children: [
    { id: 'member-list', name: 'Member List', navigateTo: '/admin/member' },
    { id: 'member-setting', name: 'Member Setting', navigateTo: '/admin/member/setting' },
    { id: 'member-group', name: 'Member Group', navigateTo: '/admin/member/group' },
    { id: 'member-point', name: 'Point', navigateTo: '/admin/point' }, ], },
  { id: 'content', name: 'Content', icon: <FaFileAlt />, children: [
    { id: 'document', name: 'Document', navigateTo: '/admin/document' },
    { id: 'comment', name: 'Comment', navigateTo: '/admin/comment' },
    { id: 'file', name: 'File', navigateTo: '/admin/file' },
    { id: 'poll', name: 'Poll', navigateTo: '/admin/poll' },
    { id: 'language', name: 'Multilingual', navigateTo: '/admin/language' },
    { id: 'trash', name: 'Trash', navigateTo: '/admin/trash' },
    { id: 'spam', name: 'SpamFilter', navigateTo: '/admin/spam' }, ], },
  { id: 'favorite', name: 'Favorite', icon: <FaStar />, children: [
    // { id: '', name: '' } 
  ], },
  { id: 'settings', name: 'Settings', icon: <FiTool />, children: [
    { id: 'setting-general', name: 'General', navigateTo: '/admin/setting/general' },
    { id: 'admin-menu', name: 'Admin Setup', navigateTo: '/admin/setting/menu' },
    { id: 'setting-file', name: 'File Uplaod', navigateTo: '/admin/setting/file' }, ], },
  { id: 'advanced', name: 'Advanced', icon: <FaCog />, children: [
    // { id: '', name: '' },
  ], },
] as IMenu[];

const SideMenu = () => {
  // State to track expanded accordions
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  // State to track collapsea
  const [collapsed, setCollapsed] = useState(false); 
  const [menuData, setMenuData] = useState(initialMenuData);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to update the active state based on the current path
  const updateActiveMenu = (path: string) => {
    const normalizePath = (path: string) => path.replace(/\/+$/, '');

    const updateMenu = (menus: IMenu[]): IMenu[] =>
      menus.map(menu => {
        // Check if the normalized paths match
        const isActive =
          normalizePath(menu.navigateTo ?? '') === normalizePath(path) ||
          menu.children?.some(child => normalizePath(child.navigateTo ?? '') === normalizePath(path));
  
        return {
          ...menu,
          active: isActive,
          children: menu.children ? updateMenu(menu.children) : undefined,
        };
      });
  
    setMenuData(updateMenu(initialMenuData));
  };

  useEffect(() => {
    console.log(menuData);
  }, [menuData])

  // Update active state whenever the path changes
  useEffect(() => {
    updateActiveMenu(location.pathname);
  }, [location.pathname]);

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
    } else {
      setCollapsed(false);
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
            className={menu.active ? 'active' : ''}
            expanded={expandedMenus.includes(menu.id)}
            onChange={handleAccordionChange(menu)}>
            <AccordionSummary expandIcon={!collapsed && expandIcon(menu)} onClick={(event) => {onClick(menu)}}>
              <ListItemIcon>
                {menu.icon}
              </ListItemIcon>
              { !collapsed && <ListItemText primary={menu.name} sx={{ml: '16px'}}/> }
            </AccordionSummary>
            {(menu.children?.length ?? 0) > 0 && (
              <AccordionDetails>
                <List>
                  {menu.children?.map((child) => (
                    <ListItem key={child.id} onClick={() => {onClick(child)}}>
                      <ListItemText primary={child.name} className={child.active ? 'active' : ''}/>
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