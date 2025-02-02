import { useState } from "react";
import Tree from "./Tree";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import Menu from "./Menu";
import { Box } from "@mui/material";
import { IMenu } from "./types";
import { FormikValues } from "formik";
import Permission from "./Permission";
import { showToast } from "function/showToast";

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
  const [selectedNode, setSelectedNode] = useState(null);
  const [openFlags, setOpenFlags] = useState<Record<ETab, boolean>>(initFlags)

  const setFlag = (tab: ETab, flag: boolean) => {
    setOpenFlags((prev) => ({ ...prev, [tab]: flag }));
  };

  const handleAddMenu = () => {
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
    onEditNode: (node: IMenu) => { setState(EState.edit); },
    onAddMenu: () => { setState(EState.add); },
    onCut: (node: IMenu) => { showNotImplementedToast() },
    onCopy: (node: IMenu) => { showNotImplementedToast() },
    onPaste: (node: IMenu) => { showNotImplementedToast() },
    onDelete: (node: IMenu) => { showNotImplementedToast() },
    onSetHomepage: (node: IMenu) => { showNotImplementedToast() },
    onMenuLinkImage: (node: IMenu) => { showNotImplementedToast() },
    onDesign: (node: IMenu) => { showNotImplementedToast() },
    onPermission: (node: IMenu) => { setState(EState.permission); },
    onFullSettings: (node: IMenu) => { showNotImplementedToast() },
    onClose: () => { setState(EState.default); },
  };

  const addFormProps = {
    onClose: () => { setFlag(ETab.add, false); },
    onSubmitHandler: (values: FormikValues) => { console.log(values); }
  }

  const editFormProps = {
    onClose: () => { setFlag(ETab.edit, false); },
    onSubmitHandler: (values: FormikValues) => { console.log(values); }
  }

  const permissionProps = {
    onClose: () => { setFlag(ETab.permission, false); },
    onSubmitHandler: (values: FormikValues) => { console.log(values); }
  }

  return (
    <Box display="flex" height="100%" gap={2}>
      <Tree onAddMenu={handleAddMenu} onSelectNode={handleSelectNode} />
      {openFlags[ETab.menu] && selectedNode && <Menu node={selectedNode} {...menuProps}/>}
      {openFlags[ETab.add] && <AddForm {...addFormProps} />}
      {openFlags[ETab.edit] && selectedNode &&  <EditForm node={selectedNode} {...editFormProps} />}
      {openFlags[ETab.permission] && selectedNode &&  <Permission node={selectedNode} {...permissionProps} />}
    </Box>
  );
};

export default Edit;