import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomButton from "../../util/CustomButton";

//MUI STUFF
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

//MUI Icon
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";

//REDUX STUFF
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

const styles = {
    submitButton: {
        position: "relative",
        float: "right",
        marginTop: 20,
        marginBottom: 20
    },
    textField: {
        margin: "5px auto",
        width: "100%"
    },
    progressSpinner: {
        position: "absolute"
    },
    closeButton: {
        position: "absolute",
        left: "90%",
        top: "10px"
    }
};
class PostScream extends Component {
    state = {
        open: false,
        body: "",
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: "", open: false, errors: {} });
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postScream({ body: this.state.body });
    };

    render() {
        const { errors } = this.state;
        const {
            classes,
            UI: { loading }
        } = this.props;

        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Scream!">
                    <AddIcon />
                </CustomButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <CustomButton
                        tip="Fermer"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <Close />
                    </CustomButton>
                    <DialogTitle> Scream! </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Scream!"
                                placeholder="Scream!"
                                multiline
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Envoyer
                                {loading && (
                                    <CircularProgress
                                        size={30}
                                        className={classes.progressSpinner}
                                    />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { postScream, clearErrors }
)(withStyles(styles)(PostScream));
