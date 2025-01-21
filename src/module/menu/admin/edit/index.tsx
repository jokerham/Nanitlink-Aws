import { useState } from "react";
import Tree from "./Tree";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import Menu from "./Menu";
import { Box } from "@mui/material";

const Edit: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const handleAddMenu = () => {
    setSelectedNode(null);
    setIsAdding(true);
  };

  const handleSelectNode = (node: any) => {
    setSelectedNode(node);
    setIsAdding(false);
  };

  return (
    <Box display="flex" height="100%" gap={2}>
      <Tree onAddMenu={handleAddMenu} onSelectNode={handleSelectNode} />
      {!isAdding && selectedNode && <Menu node={selectedNode} />}
      {isAdding && <AddForm />}
      {isEditing && selectedNode &&  <EditForm node={selectedNode} />}
    </Box>
  );
};

export default Edit;