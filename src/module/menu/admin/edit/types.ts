import { NodeRendererProps } from "react-arborist";

export interface IMenu {
  id: string,
  name: string,
  children?: IMenu[],
  onClickAction?: (menu: IMenu) => void,
  active?: boolean,
  module?: string;
  moduleId?: string;
  navigateTo?: string,
};

interface NodeAdditionalProps {
  onNodeClick: (node: IMenu) => void
}

export type NodeProps = NodeRendererProps<IMenu> & NodeAdditionalProps ;
