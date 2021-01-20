import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

export default function MerchantsFormDialog({
  handleClose,
  handleCreateNewMerchant,
  handleUpdateMerchant,
  isOpen,
  merchant,
}) {
  const [name, setName] = useState(merchant ? merchant.name : "");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const merchantDetails = {
      name,
    };
    if (merchant) {
      handleUpdateMerchant(merchantDetails);
    } else {
      handleCreateNewMerchant(merchantDetails);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Merchant</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent style={{ minWidth: 256 }}>
          <DialogContentText>
            {`${merchant ? "Update" : "Add"} merchant details:`}
          </DialogContentText>

          <TextField
            margin="dense"
            id="email"
            label="Merchant name"
            type="text"
            fullWidth
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {merchant ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
