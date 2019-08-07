import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomButton from "../../util/CustomButton";
import dayjs from "dayjs";
import * as locale from "dayjs/locale/fr";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

//MUI STUFF
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//MUI Icon
import Close from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";

//redux stuff
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

const styles = {
    invisibleSeprator: {
        border: "none",
        margin: 4
    },
    separator: {
        border: "1px solid #cecece",
        margin: "20px 0",
        width: "100%"
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: "50%",
        objectFit: "cover"
    },
    dialogContent: {
        padding: "40px 20px"
    },
    closeButton: {
        position: "absolute",
        left: "90%",
        top: "5%"
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
        this.props.clearErrors();
    };
    render() {
        dayjs.locale(locale);
        const {
            classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments
            },
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={90} className={classes.circularProgress} thickness={2} />
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
                    <LikeButton screamId={screamId} />
                    <span>{likeCount}</span>
                    <CustomButton tip="">
                        <ChatIcon color="primary" />
                    </CustomButton>
                    <span>{commentCount}</span>
                </Grid>
                <hr className={classes.separator} />
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
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
    clearErrors: PropTypes.func.isRequired,
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
    { getScream, clearErrors }
)(withStyles(styles)(ScreamDialog));
