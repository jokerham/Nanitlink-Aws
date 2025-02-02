import { NodeRendererProps } from "react-arborist";

export type NodeProps = NodeRendererProps<IMenu> & NodeAdditionalProps ;
export type TNodeFunction = (node: IMenu) => void;
export type TGeneralFunction = () => void;

export interface IMenu {
  id: string,
  name: string,
  children?: IMenu[],
  onClickAction?: TNodeFunction | TGeneralFunction,
  active?: boolean,
  module?: string;
  moduleId?: string;
  navigateTo?: string,
};

interface NodeAdditionalProps {
  onNodeClick: (node: IMenu) => void
}

export interface IMenuProps {
  node: IMenu,
  onEditNode: TNodeFunction,
  onAddMenu: TGeneralFunction,
  onCut: TNodeFunction,
  onCopy: TNodeFunction,
  onPaste: TNodeFunction,
  onDelete: TNodeFunction,
  onSetHomepage: TNodeFunction,
  onMenuLinkImage: TNodeFunction,
  onDesign: TNodeFunction,
  onPermission: TNodeFunction,
  onFullSettings: TNodeFunction,
  onClose: TGeneralFunction,
}