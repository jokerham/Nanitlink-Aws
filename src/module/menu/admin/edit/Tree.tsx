import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import { Tree as ArboristTree, NodeApi } from 'react-arborist';
import { FaFolder, FaFolderOpen, FaHome, FaPlusCircle } from 'react-icons/fa';
import { CgMenuBoxed } from 'react-icons/cg';
import { useResizeObserver } from 'usehooks-ts';
import { RowBox } from '@/component/customMui';
import { ActionButton, ActionTypography, ContainedButton, SearchTextField, TreeNodeLabel, TreeNodeRowBox } from './Components';
import { gqListMenuTree } from '@/function/amplify/graphql/menu/gqListMenu';
import Tab from './Tab';
import { IMenu, NodeProps } from './types';
import '@/extension/nodeApiExt';

interface ITreeProps { 
  onAddMenu: () => void,
  onSelectNode: (node: any) => void 
}

const initialTeeProps = {
  data: [] as IMenu[],
  indent: 20,
  padding: 0,
  height: 0,
  width: 0,
  rowHeight: 26,
};

const Tree = ({ onAddMenu, onSelectNode }: ITreeProps) => {
  const targetRef = useRef<HTMLElement>(document.createElement('div'));
  const { width = 0, height = 0 } = useResizeObserver({
    ref: targetRef,
  });
  const [treeProps, setTreeProps] = useState(initialTeeProps);

  const fetchMenu = async () => {
    const data = await gqListMenuTree(-1, null);
    setTreeProps((prev) => ({ ...prev, data }));
  };

  useEffect(() => {
    setTreeProps((prev) => ({
      ...prev,
      width: width ?? prev.width,
      height: (height ?? prev.height) - 15 
    }));
  }, [width, height]);

  useEffect(() => {
    fetchMenu();
  }, []);

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
      ref={targetRef}
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