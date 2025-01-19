import React from 'react';
import { Tree as ArboristTree } from 'react-arborist';
import { Box, Button, Divider, TextField } from '@mui/material';
import { IoAddCircleOutline } from 'react-icons/io5';

const Tree: React.FC<{ onAddMenu: () => void; onSelectNode: (node: any) => void }> = ({ onAddMenu, onSelectNode }) => {
  const data = [
    { id: 1, name: 'Main menu', children: [{ id: 2, name: 'Submenu 1' }] },
    { id: 3, name: 'Utility menu' },
    { id: 4, name: 'Footer Menu' },
    { id: 5, name: 'Backup' },
    { id: 6, name: 'unlinked' },
  ];

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box padding="10px">
        <TextField
          fullWidth
          placeholder="Search..."
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <Button variant="contained" size="small">
                  Find
                </Button>
              ),
            },
          }}
        />
      </Box>
      <Divider />
      <Box flex="1" overflow="auto">
        <ArboristTree
          data={data}
          width="100%"
          height={400}
          onActivate={onSelectNode}
          disableDrag
        >
          {({ node, style }) => (
            <div
              style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px dotted #ccc',
                padding: '5px 10px',
              }}
            >
              <span style={{ marginRight: '10px' }}>📁</span>
              <span>{node.data.name}</span>
            </div>
          )}
        </ArboristTree>
      </Box>
      <Divider />
      <Box display="flex" justifyContent="flex-end" padding="10px">
        <Button
          variant="text"
          startIcon={<IoAddCircleOutline />}
          onClick={onAddMenu}
        >
          Add Menu
        </Button>
      </Box>
    </Box>
  );
};

export default Tree;
