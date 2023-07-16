import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

export default function SnackbarBtn({ open, handleClose, message, severity }) {
  return (
    <div>
      <Snackbar
        autoHideDuration={2500}
        open={open}
        onClose={handleClose}
        message={message}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
}
