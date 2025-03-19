import { useEffect, useState } from "react";
import Tree from "./Tree";
import AddForm, { IAddFormProps } from "./AddForm";
import EditForm, { IEditFormProps } from "./EditForm";
import Menu from "./Menu";
import { Box } from "@mui/material";
import { IMenu } from "./types";
import { FormikValues } from "formik";
import Permission from "./Permission";
import { showToast } from "function/showToast";
import { gqAddMenu, IAddMenuInput } from "function/amplify/graphql/menu/gqAddMenu";
import { gqDeleteMenu } from "function/amplify/graphql/menu/gqDeleteMenu";
import { gqUpdateMenu, IUpdateMenuInput } from "function/amplify/graphql/menu/gqUpdateMenu";

enum EState {
  default,
  add,
  edit,
  delete,
  cut,
  copy,
  paste,
  setHomepage,
  menuLinkImage,
  design,
  permission,
  fullSettings
}

enum ETab {
  menu,
  add,
  edit,
  permission,
  design,
  fullSettings,
}

const initFlags: Record<ETab, boolean> = {
  [ETab.menu]: false,
  [ETab.add]: false,
  [ETab.edit]: false,
  [ETab.permission]: false,
  [ETab.design]: false,
  [ETab.fullSettings]: false
}

const Edit: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [selectedNode, setSelectedNode] = useState<IMenu|null>(null);
  const [openFlags, setOpenFlags] = useState<Record<ETab, boolean>>(initFlags)
  const [parentId, setParentId] = useState<string|undefined>(undefined);

  const setFlag = (tab: ETab, flag: boolean) => {
    setOpenFlags((prev) => ({ ...prev, [tab]: flag }));
  };

  const handleAddMenu = () => {
    setParentId(undefined);
    setState(EState.default);
    setState(EState.add); 
  };

  const handleSelectNode = (node: any) => {
    setSelectedNode(node);
    setState(EState.default);
    setFlag(ETab.menu, true);
  };

  const setState = (state: EState) => {
    switch(state) {
      case EState.default:
        setFlag(ETab.menu, false);
        setFlag(ETab.add, false);
        setFlag(ETab.edit, false);
        break;
      case EState.add:
        setFlag(ETab.edit, false);
        setFlag(ETab.add, true);
        setFlag(ETab.permission, false);
        break;
      case EState.edit:
        setFlag(ETab.add, false);
        setFlag(ETab.edit, true);
        setFlag(ETab.permission, false);
        break;
      case EState.permission:
        setFlag(ETab.permission, true);
        setFlag(ETab.add, false);
        setFlag(ETab.edit, false);
        break;
      default:
    }
  }

  const showNotImplementedToast = () => {
    showToast('Not implemented yet', 'error');
  }

  const menuProps = {
    onEditNode: (node: IMenu) => { 
      setState(EState.edit); 
    },
    onAddMenu: (node: IMenu) => {
      setParentId(node.id);
      setState(EState.add); 
    },
    onCut: (node: IMenu) => { showNotImplementedToast() },
    onCopy: (node: IMenu) => { showNotImplementedToast() },
    onPaste: (node: IMenu) => { showNotImplementedToast() },
    onDelete: async (node: IMenu) => { 
      await gqDeleteMenu(node.id);
      setSelectedNode(null);
      setState(EState.default);
      setRefreshKey((prev) => prev + 1);
    },
    onSetHomepage: (node: IMenu) => { showNotImplementedToast() },
    onMenuLinkImage: (node: IMenu) => { showNotImplementedToast() },
    onDesign: (node: IMenu) => { showNotImplementedToast() },
    onPermission: (node: IMenu) => { setState(EState.permission); },
    onFullSettings: (node: IMenu) => { showNotImplementedToast() },
    onClose: () => { setState(EState.default); },
  };

  const permissionProps = {
    onClose: () => { setFlag(ETab.permission, false); },
    onSubmitHandler: (values: FormikValues) => { console.log(values); }
  }

  const addFormProps = {
    onClose: () => {
      setFlag(ETab.add, false);
    },
    onSubmitHandler: async (values: FormikValues) => {
      const input: IAddMenuInput = {
        parentId: values.parentId,
        name: values.name,
        module: values.module,
        moduleId: values.moduleId,
        link: values.link,
      }
      await gqAddMenu(input);
      setState(EState.default);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const editFormProps = {
    onClose: () => {
      setFlag(ETab.edit, false);
    },
    onSubmitHandler: async (values: FormikValues) => {
      const update: IUpdateMenuInput= {
        id: values.id,
        name: values.name,
        moduleId: values.moduleId,
      }
      await gqUpdateMenu(update);
      setState(EState.default);
      setRefreshKey((prev) => prev + 1);
    }
  };

  return (
    <Box display="flex" height="100%" gap={2}>
      <Tree key={refreshKey} onAddMenu={handleAddMenu} onSelectNode={handleSelectNode} />
      {openFlags[ETab.menu] && selectedNode && <Menu node={selectedNode} {...menuProps}/>}
      {openFlags[ETab.add] && <AddForm parentId={parentId} {...addFormProps} />}
      {openFlags[ETab.edit] && selectedNode &&  <EditForm node={selectedNode} {...editFormProps} />}
      {openFlags[ETab.permission] && selectedNode &&  <Permission node={selectedNode} {...permissionProps} />}
    </Box>
  );
};

export default Edit;