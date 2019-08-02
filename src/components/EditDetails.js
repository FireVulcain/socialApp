import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomButton from "../util/CustomButton";

//REDUX STUFF
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

//MUI STUFF
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//MUI Icon
import EditIcon from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

const styles = {
    textField: {
        margin: "5px auto",
        width: "100%"
    },
    button: {
        float: "right"
    }
};

class EditDetails extends Component {
    state = {
        bio: "",
        website: "",
        location: "",
        open: false
    };
    setUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            website: credentials.website ? credentials.website : "",
            location: credentials.location ? credentials.location : ""
        });
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.setUserDetailsToState(this.props.credentials);
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    componentDidMount = () => {
        const { credentials } = this.props;
        this.setUserDetailsToState(credentials);
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CustomButton
                    tip="Éditer le profil"
                    onClick={this.handleOpen}
                    btnClassName={classes.button}
                >
                    <EditIcon color="primary" />
                </CustomButton>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Editer votre profil</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                placeholder="Une courte déscription"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                            />
                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Où habitez-vous ?"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                            />
                            <TextField
                                name="website"
                                type="text"
                                label="Site web"
                                placeholder="Votre site personnel/professionnel"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            <Close />
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Enregistrer
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { editUserDetails }
)(withStyles(styles)(EditDetails));
