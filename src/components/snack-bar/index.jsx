import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

// actions
import { hideSnackBar } from "../../actions/snackBar";

const DURATION = 2000;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackBar({ hideSnackBar, showSnackBar, snackBarDetails }) {
  const handleCloseSnackBar = () => {
    hideSnackBar();
  };

  const renderAlert = (snackBarDetails) => {
    const { status, message } = snackBarDetails;

    return (
      <Alert onClose={handleCloseSnackBar} severity={status}>
        {message}
      </Alert>
    );
  };

  return (
    <Snackbar
      open={showSnackBar}
      autoHideDuration={DURATION}
      onClose={handleCloseSnackBar}
    >
      {snackBarDetails && renderAlert(snackBarDetails)}
    </Snackbar>
  );
}

const mapStateToProps = (state) => {
  return {
    showSnackBar: state.snackBar.showSnackBar,
    snackBarDetails: state.snackBar.details,
  };
};

const mapDispatch = {
  hideSnackBar,
};

export default connect(mapStateToProps, mapDispatch)(SnackBar);
