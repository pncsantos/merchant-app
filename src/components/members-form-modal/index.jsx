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

export default function MembersFormDialog({
  closeModal,
  handleCreateNewMember,
  handleUpdateMember,
  isOpen,
  member,
}) {
  const [name, setName] = useState(member ? member.name : "");
  const [email, setEmail] = useState(member ? member.email : "");

  const handleClose = () => {
    closeModal();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userDetails = {
      name,
      email,
    };
    if (member) {
      handleUpdateMember(userDetails);
    } else {
      handleCreateNewMember(userDetails);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Team Member</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent style={{ minWidth: 256 }}>
          <DialogContentText>
            {`${member ? "Update" : "Add"} team member details:`}
          </DialogContentText>

          <TextField
            margin="dense"
            id="email"
            label="Member name"
            type="text"
            fullWidth
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {member ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
