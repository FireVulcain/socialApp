import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import * as locale from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

// MUI STUFF
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//Icon
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
import FavIcon from "@material-ui/icons/Favorite";
import UnFavIcon from "@material-ui/icons/FavoriteBorderOutlined";

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";
import CustomButton from "../util/CustomButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";

const styles = {
    card: {
        position: "relative",
        display: "flex",
        padding: "9px 25px",
        borderRadius: 0
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 50,
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 5
    },
    content: {
        paddingTop: 10,
        "&:last-child": {
            paddingBottom: 10
        }
    },
    inlineInfo: {
        display: "inline-block",
        marginLeft: 10,
        verticalAlign: "middle"
    },
    postedAt: {
        display: "inline-block",
        marginLeft: 10
    },
    screamActions: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 200
    },
    screamAction: {
        width: 100
    }
};

class Scream extends Component {
    likedScream = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find((like) => like.screamId === this.props.scream.screamId)
        ) {
            return true;
        } else {
            return false;
        }
    };
    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    };
    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    };
    render() {
        dayjs.extend(relativeTime).locale(locale);
        const {
            classes,
            scream: { body, createdAt, userHandle, userImage, screamId, likeCount, commentCount },
            user: {
                credentials: { handle: authenticatedUserName, imageUrl: authenticatedUserImage },
                authenticated
            }
        } = this.props;

        const screamImage =
            userHandle === authenticatedUserName ? authenticatedUserImage : userImage;
        const likeButton = !authenticated ? (
            <CustomButton tip="Like">
                <Link to="/login">
                    <UnFavIcon />
                </Link>
            </CustomButton>
        ) : this.likedScream() ? (
            <CustomButton tip="" onClick={this.unlikeScream}>
                <FavIcon color="primary" />
            </CustomButton>
        ) : (
            <CustomButton tip="" onClick={this.likeScream}>
                <UnFavIcon color="primary" />
            </CustomButton>
        );

        const deleteButton =
            authenticated && userHandle === authenticatedUserName ? (
                <DeleteScream screamId={screamId} />
            ) : null;

        return (
            <Paper className={classes.card}>
                <div className={classes.content}>
                    <Link to={`/user/${userHandle}`}>
                        <img
                            src={screamImage}
                            title="Profil image"
                            className={classes.image}
                            alt=""
                        />
                    </Link>
                    <div className={classes.inlineInfo}>
                        <Typography
                            variant="h6"
                            component={Link}
                            to={`/user/${userHandle}`}
                            color="primary"
                        >
                            {userHandle}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            className={classes.postedAt}
                        >
                            {dayjs(createdAt).fromNow()}
                        </Typography>
                        {deleteButton}
                        <Typography variant="body1">{body}</Typography>
                        <div className={classes.screamActions}>
                            <div className={classes.screamAction}>
                                {likeButton}
                                <span>{likeCount}</span>
                            </div>
                            <div className={classes.screamAction}>
                                <CustomButton tip="">
                                    <ChatIcon color="primary" />
                                </CustomButton>
                                <span>{commentCount}</span>
                            </div>
                            <div className={classes.screamAction}>
                                <ScreamDialog screamId={screamId} userHandle={userHandle} />
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyle(styles)(Scream));
