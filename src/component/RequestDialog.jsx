import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cookies from "js-cookie"

export default class RequestDialog extends Component {
  
  state = { open: false, progress: false }

  openDialog = () => {
    this.setState({open: true})
  };

  closeDialog = () => {
    this.setState({open: false});
  };

  //props.handler(openDialog);

  sendRequest = (targetUsername) => {
    this.setState({progress: true})
    this.props.socket.emit("publish-friend-request", {sender: Cookies.get("id"), receiver: targetUsername}, (data) => {
      console.log(data)
      this.setState({progress: false})
      if (data.statusCode===1){
        this.closeDialog()
        window.alert("Request Sent")
      } else {
        window.alert(data.msg)
      }
    })
  }

  render(){
    return (
      <div>
        <Dialog open={this.state.open} onClose={() => {this.closeDialog()}} aria-labelledby="form-dialog-title" disableBackdropClick>
          <DialogTitle id="form-dialog-title">Send Friend Request</DialogTitle>
          <DialogContent>
          <DialogContentText>
            You'll be able to chat only when a person has accepted your friendship request.
          </DialogContentText>
            <TextField autoFocus margin="dense" id="usernameText" label="Recepient Username" type="text" fullWidth />                   
          </DialogContent>
          <DialogActions style={{marginRight: "10px", marginBottom: "5px"}}>          
            {this.state.progress?
            <CircularProgress/>
            :
            <React.Fragment>
              <Button onClick={() => { this.closeDialog() }} color="primary">Cancel</Button>
              <Button onClick={() => { this.sendRequest(document.getElementById("usernameText").value) }} color="primary">Send</Button>
            </React.Fragment>}            
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
