import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { RowBox } from "@/component/customMui";

interface props {
  open: boolean;
  item: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Index = ({open, item, onCancel, onConfirm}: props) => {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>
          Delete Confirmation
          <IconButton onClick={onCancel}>
            <IoClose />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          Please confirm if you want to delete the following item:
          <RowBox sx={{gap: 2, mt: 2}}>
            {item}
          </RowBox>          
        </DialogContent>
        <DialogActions>
          <Button variant="contained" fullWidth onClick={onCancel} sx={{mt: 2}}>
            Cancel
          </Button>
          <Button variant="contained" fullWidth onClick={onConfirm} sx={{mt: 2}}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default Index;
