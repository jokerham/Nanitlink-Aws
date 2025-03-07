import { useEffect, useState } from 'react';
import { Tree as ArboristTree, NodeApi } from 'react-arborist';
import { RowBox } from 'component/customMui';
import { FaFolder, FaFolderOpen, FaHome, FaPlusCircle } from 'react-icons/fa';
import { CgMenuBoxed } from 'react-icons/cg';
import { Box} from '@mui/material';
import useResizeObserver from 'use-resize-observer';
import { IMenu, NodeProps } from './types';
import 'extension/nodeApiExt';
import Tab from './Tab';
import { ActionButton, ActionTypography, ContainedButton, SearchTextField, TreeNodeLabel, TreeNodeRowBox } from './Components';

const initialMenuData = [
  { id: 'dashboard', name: 'Dashboard', module: 'page', moduleId: 'Dashboard', children: [], navigateTo: '/admin'},
  { id: 'menu', name: 'Menu', module: 'page', moduleId: 'Menu', children: [
    { id: 'menu-editor', name: 'Menu Editor', module: 'page', moduleId: 'Menu Editor', navigateTo: '/admin/menu/edit' },
    { id: 'site-design', name: 'Site Design', module: 'page', moduleId: 'Site Design', navigateTo: '/admin/site/design' },
    { id: 'layouts', name: 'Layouts', module: 'page', moduleId: 'Layouts', navigateTo: '/admin/layout/list' }, ], },
  { id: 'member', name: 'Member', module: 'page', moduleId: 'Member', children: [
    { id: 'member-list', name: 'Member List', module: 'page', moduleId: 'Member List', navigateTo: '/admin/member/list' },
    { id: 'member-setting', name: 'Member Setting', module: 'page', moduleId: 'Member Setting', navigateTo: '/admin/member/setting' },
    { id: 'member-group', name: 'Member Group', module: 'page', moduleId: 'Member Group', navigateTo: '/admin/member/group' },
    { id: 'member-point', name: 'Point', module: 'page', moduleId: 'Point', navigateTo: '/admin/point' }, ], },
  { id: 'content', name: 'Content', module: 'page', moduleId: 'Content', children: [
    { id: 'document', name: 'Document', module: 'page', moduleId: 'Document', navigateTo: '/admin/document/list' },
    { id: 'comment', name: 'Comment', module: 'page', moduleId: 'Comment', navigateTo: '/admin/comment/list' },
    { id: 'file', name: 'File', module: 'page', moduleId: 'File', navigateTo: '/admin/file/list' },
    { id: 'poll', name: 'Poll', module: 'page', moduleId: 'Poll', navigateTo: '/admin/poll/list' },
    { id: 'language', name: 'Multilingual', module: 'page', moduleId: 'Multilingual', navigateTo: '/admin/language/list' },
    { id: 'trash', name: 'Trash', module: 'page', moduleId: 'Trash', navigateTo: '/admin/trash/list' },
    { id: 'spam', name: 'SpamFilter', module: 'page', moduleId: 'SpamFilter', navigateTo: '/admin/spam/list' }, ], },
  { id: 'favorite', name: 'Favorite', module: 'page', moduleId: 'Favorite', children: [] },
  { id: 'settings', name: 'Settings', module: 'page', moduleId: 'Settings', children: [
    { id: 'setting-general', name: 'General', module: 'page', moduleId: 'General', navigateTo: '/admin/setting/general' },
    { id: 'admin-menu', name: 'Admin Setup', module: 'page', moduleId: 'Admin Setup', navigateTo: '/admin/setting/menu' },
    { id: 'setting-file', name: 'File Uplaod', module: 'page', moduleId: 'File Uplaod', navigateTo: '/admin/setting/file' }, ], },
  { id: 'advanced', name: 'Advanced', module: 'page', moduleId: 'Advanced', children: [] },
] as IMenu[];

interface ITreeProps { 
  onAddMenu: () => void,
  onSelectNode: (node: any) => void 
}

const Tree = ({ onAddMenu, onSelectNode }: ITreeProps) => {
  const { ref, width, height } = useResizeObserver();
  const [treeProps, setTreeProps] = useState({
    data: initialMenuData,
    indent: 20,
    padding: 0,
    height: 0,
    width: 0,
    rowHeight: 26,
  });

  useEffect(() => {
    setTreeProps((prev) => ({
      ...prev,
      width: width ?? prev.width,
      height: (height ?? prev.height) - 15 
    }));
  }, [width, height]);

  return (
    <Tab
      width={345}
      title='Menu Editor'
      headerComponent={
        <RowBox>
          <SearchTextField id="search" />
          <ContainedButton>Find</ContainedButton>
          <ContainedButton disabled>Next</ContainedButton>
        </RowBox>
      }
      contentComponent={
        <ArboristTree {...treeProps}>
          {(nodeProps) => (
            <TreeNode {...nodeProps} onNodeClick={onSelectNode} />
          )}
        </ArboristTree>
      }
      actionComponent={
        <ActionButton onClick={onAddMenu}>
          <ActionTypography>
            <FaPlusCircle /> Add Menu
          </ActionTypography>
        </ActionButton>
      }
      ref={ref}
    />
  );
};

const TreeNode = ({ node, style, dragHandle, onNodeClick }: NodeProps) => {
  const hasParent = (node.parent ?? '') !== '';
  const hasChildren = (node.children?.length ?? 0) > 0;
  const isClosed = node.isClosed;
  const icon = hasParent ? (hasChildren ? (isClosed ? <FaFolder /> : <FaFolderOpen />) : <CgMenuBoxed />) : <FaHome />;
  
  const handleClick = () => {
    node.tree.root.walk((n: NodeApi<IMenu>) => { n.data.active = false; });
    node.data.active = true;
    onNodeClick(node.data);
  }

  return (
    <Box style={style} ref={dragHandle}>
      <TreeNodeRowBox 
        className={node.data.active ? 'active' : ''} 
        onClick={handleClick}>
        <TreeNodeLabel>
          {icon}
          {node.data.name}
        </TreeNodeLabel>
      </TreeNodeRowBox>
    </Box>
  );
};

export default Tree;