import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomButton from "../util/CustomButton";
import dayjs from "dayjs";
import * as locale from "dayjs/locale/fr";
import { Link } from "react-router-dom";

//MUI STUFF
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//MUI Icon
import Close from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

//redux stuff
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

const styles = {
    invisibleSeprator: {
        border: "none",
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: "50%",
        objectFit: "cover"
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: "absolute",
        left: "90%"
    },
    circularProgress: {
        display: "block",
        margin: "0 auto"
    }
};
class ScreamDialog extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getScream(this.props.screamId);
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        dayjs.locale(locale);
        const {
            classes,
            scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle },
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={50} className={classes.circularProgress} />
        ) : (
            <Grid container>
                <Grid item sm={5}>
                    <Link to={`/user/${userHandle}`}>
                        <img src={userImage} alt="Profile" className={classes.profileImage} />
                    </Link>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        to={`/user/${userHandle}`}
                        variant="h5"
                        color="primary"
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeprator} />
                    <Typography variant="body2">
                        {dayjs(createdAt).format("HH:mm · DD MMMM YYYY ·")}
                    </Typography>
                    <hr className={classes.invisibleSeprator} />
                    <Typography variant="body1">{body}</Typography>
                </Grid>
            </Grid>
        );

        return (
            <Fragment>
                <CustomButton
                    onClick={this.handleOpen}
                    tip="Ouvrir le Scream!"
                    tipClassName={classes.expendButton}
                >
                    <UnfoldMore color="primary" />
                </CustomButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <CustomButton
                        tip="Fermer"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <Close />
                    </CustomButton>
                    <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { getScream }
)(withStyles(styles)(ScreamDialog));
