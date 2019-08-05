import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import * as locale from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";

//MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
    commentImage: {
        maxWidth: "100%",
        height: 50,
        objectFit: "cover",
        borderRadius: "50%"
    },
    commentData: {
        marginLeft: 20
    },
    separator: {
        border: "1px solid #000"
    },
    flexElements: {
        display: "flex",
        alignItems: "center"
    },
    commentDate: {
        marginLeft: 10
    }
};
class Comments extends Component {
    render() {
        dayjs.extend(relativeTime).locale(locale);
        const { comments, classes } = this.props;
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={1}>
                                        <Link to={`/user/${userHandle}`}>
                                            <img
                                                src={userImage}
                                                alt="profile"
                                                className={classes.commentImage}
                                            />
                                        </Link>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <div className={classes.flexElements}>
                                                <Typography
                                                    variant="h5"
                                                    component={Link}
                                                    to={`/user/${userHandle}`}
                                                    color="primary"
                                                >
                                                    {userHandle}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    className={classes.commentDate}
                                                >
                                                    {dayjs(createdAt).fromNow()}
                                                </Typography>
                                            </div>

                                            <Typography variant="body1">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                {index !== comments.length - 1 && (
                                    <hr className={classes.seperator} />
                                )}
                            </Grid>
                        </Fragment>
                    );
                })}
            </Grid>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
