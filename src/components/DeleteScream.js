import React, { Component, Fragment } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import CustomButton from "../util/CustomButton";

//Mui stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

//Redux stuff
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";

const styles = {
    deleteButton: {
        position: "absolute",
        left: "90%",
        top: "10px"
    },
    confirmDeleteBox: {
        justifyContent: "center"
    }
};

class DeleteScream extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <CustomButton
                    tip="Supprimer le Scream!"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary" />
                </CustomButton>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Supprimer le Scream! ?</DialogTitle>
                    <DialogActions className={classes.confirmDeleteBox}>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.deleteScream} color="secondary">
                            Supprimer
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
};
export default connect(
    null,
    { deleteScream }
)(withStyle(styles)(DeleteScream));
