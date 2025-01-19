import { Box, Link } from "@mui/material";
import { Section, SectionContent, SectionTitle } from "component/Section";
import { NodeApi, NodeRendererProps, Tree } from 'react-arborist';
import { styled } from '@mui/system';
import { SiPluscodes } from 'react-icons/si';
import { TreeProps } from "react-arborist/dist/module/types/tree-props";

interface IMenu {
  id: string,
  name: string,
  children?: IMenu[],
  isRootNode?: boolean,
};

const StyledTree = styled(Tree<IMenu>)({
  backgroundColor: '#eee',
  borderRadius: '8px',
  margin: '8px 0 16px 0',
});

const MenuNodeBox = styled(Box)(({ node }: { node: NodeApi<IMenu> }) => {
  const { isRootNode } = node.data;
  const isFirstChild = node.childIndex === 0;
  const isLastChild = node.nextSibling === null;

  return {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isRootNode ? '#eee' : '#fff',
    fontFamily: 'Arial, sans-serif',
    fontSize: '0.8125rem',
    fontWeight: isRootNode ? 700 : 400,
    height: isRootNode ? 
      (isLastChild ? '33px' : '32px') : 
      (isLastChild ? '30px' : '32px'),
    margin: isRootNode ? '0' : '0 16px',
    paddingLeft: '16px',
    width: isRootNode ? 'calc(100% - 16px)' : 'calc(100% - 48px)',
    boxShadow: isRootNode ? 'none' : '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    borderTop: isRootNode ? '1px dashed #fff' : 'none',
    cursor: isRootNode ? 'default' : 'move',
    '&:first-of-type': {
      borderTopLeftRadius: isRootNode ? '0' : isFirstChild ? '8px' : '0',
      borderTopRightRadius: isRootNode ? '0' : isFirstChild ? '8px' : '0',
    },
    '&:last-of-type': {
      borderBottomLeftRadius: isRootNode ? '0' : isLastChild ? '8px' : '0',
      borderBottomRightRadius: isRootNode ? '0' : isLastChild ? '8px' : '0',
    },
    '&:hover': {
      backgroundColor: isRootNode ? '#eee' : '#f5f5f5',
    },
  };
});

const initialMenuData = [
  { id: 'dashboard', name: 'Dashboard'},
  { id: 'menu', name: 'Menu', children: [
    { id: 'menu-editor', name: 'Menu Editor'},
    { id: 'site-design', name: 'Site Design'},
    { id: 'layouts', name: 'Layouts'}, ], },
  { id: 'member', name: 'Member', children: [
    { id: 'member-list', name: 'Member List'},
    { id: 'member-setting', name: 'Member Setting'},
    { id: 'member-group', name: 'Member Group'},
    { id: 'member-point', name: 'Point'}, ], },
  { id: 'content', name: 'Content', children: [
    { id: 'document', name: 'Document'},
    { id: 'comment', name: 'Comment'},
    { id: 'file', name: 'File'},
    { id: 'poll', name: 'Poll'},
    { id: 'language', name: 'Multilingual'},
    { id: 'trash', name: 'Trash'},
    { id: 'spam', name: 'SpamFilter'}, ], },
  { id: 'favorite', name: 'Favorite'},
  { id: 'settings', name: 'Settings', children: [
    { id: 'setting-general', name: 'General'},
    { id: 'admin-menu', name: 'Admin Setup'},
    { id: 'setting-file', name: 'File Uplaod'}, ], },
  { id: 'advanced', name: 'Advanced'},
] as IMenu[];

const MenuNode = ({node, dragHandle}: NodeRendererProps<IMenu>) => {
  // Variables for conditions
  const isRootNode = node.parent?.isRoot;
  node.data = {...node.data, isRootNode};
  const drag = !node.data.isRootNode ? { ref: dragHandle} : {};
  return (
    <MenuNodeBox node={node} {...drag}>
      {!isRootNode && (
        <Box sx={{mr:1, fontSize: '10px'}}>
          <SiPluscodes />
        </Box>
      )}
      {node.data.name}
        {isRootNode ?
          <Box sx={{ ml: 'auto', mr: '32px' }}>
            <Link>Add</Link>
          </Box> :
          <Box sx={{ ml: 'auto', mr: '16px' }}>
            <Link>Delete</Link>
          </Box>
        }
    </MenuNodeBox>
  )
}

const StyledTreeProps: TreeProps<IMenu> = {
  initialData: initialMenuData,
  width: "100%",
  rowHeight: 33,
  disableEdit: true,
}

const MenuSetup = () => {
  const height = 33 * 24;
  return (
    <Section defaultExpanded={true}>
      <SectionTitle>Admin Menu Setup</SectionTitle>
      <SectionContent>
        <StyledTree {...StyledTreeProps} height={height}>
          {MenuNode}
        </StyledTree>
      </SectionContent>
    </Section>
  );
}

export default MenuSetup