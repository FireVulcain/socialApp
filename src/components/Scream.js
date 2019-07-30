import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import * as locale from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI STUFF
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
    card: {
        display: "flex",
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25
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
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profil image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/user/${userHandle}`} color="primary">
                        {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyle(styles)(Scream);
