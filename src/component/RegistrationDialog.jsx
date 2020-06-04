import URL from "../URL.js"
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const axios = require('axios').default;

export default function RegistrationDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signUp = (name, username, password) => {
    axios.post(`${URL}/register`, {
      name: name,
      username: username,
      password: password
    })
    .then(function (response) {
      if (response.data.statusCode === 1){
        window.alert("You're Signed Up")
        handleClose()
      } else {
        window.alert("Error Occured")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  props.callback(handleClickOpen);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField autoFocus margin="dense" id="regNameText" label="Full Name" type="text" fullWidth />
          <TextField autoFocus margin="dense" id="regUsernameText" label="Username" type="text" fullWidth />
          <TextField autoFocus margin="dense" id="regPasswordText" label="Password" type="password" fullWidth />
        </DialogContent>
        <DialogActions>          
          <Button onClick={() => { signUp(document.getElementById("regNameText").value, document.getElementById("regUsernameText").value, document.getElementById("regPasswordText").value) }} color="primary">Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
