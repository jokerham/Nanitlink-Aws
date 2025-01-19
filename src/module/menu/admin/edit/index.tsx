import { useState } from "react";
import Tree from "./Tree";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import { Box, Divider, Paper } from "@mui/material";

const Edit: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMenu = () => {
    setSelectedNode(null);
    setIsAdding(true);
  };

  const handleSelectNode = (node: any) => {
    setSelectedNode(node);
    setIsAdding(false);
  };

  return (
    <Box display="flex" height="100%">
      <Paper elevation={3} style={{ flex: 4, padding: '10px', borderRight: '1px solid #ccc' }}>
        <Tree onAddMenu={handleAddMenu} onSelectNode={handleSelectNode} />
      </Paper>
      <Divider orientation="vertical" flexItem sx={{marginX: 1}}/>
      <Box flex={8} padding="10px">
        {isAdding && <AddForm />}
        {!isAdding && selectedNode && <EditForm node={selectedNode} />}
      </Box>
    </Box>
  );
};

export default Edit;