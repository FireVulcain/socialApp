import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import * as locale from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI STUFF
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = {
    card: {
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
    }
};

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime).locale(locale);
        const {
            classes,
            scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }
        } = this.props;
        return (
            <Paper className={classes.card}>
                <div className={classes.content}>
                    <Link to={`/user/${userHandle}`}>
                        <img
                            src={userImage}
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
                        <Typography variant="body1">{body}</Typography>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default withStyle(styles)(Scream);
