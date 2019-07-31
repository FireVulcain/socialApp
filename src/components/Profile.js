import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import * as locale from "dayjs/locale/fr";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux stuff
import { connect } from "react-redux";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = {
    paper: {
        padding: 20
    },
    profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
            "& button": {
                position: "absolute",
                top: "80%",
                left: "70%"
            }
        },
        "& .profile-image": {
            width: 200,
            height: 200,
            objectFit: "cover",
            maxWidth: "100%",
            borderRadius: "50%"
        },
        "& .profile-details": {
            textAlign: "center",
            "& span, svg": {
                verticalAlign: "middle"
            },
            "& a": {
                color: "primary",
                "&:hover": {
                    textDecoration: "none"
                }
            }
        },
        "& hr": {
            border: "none",
            margin: "0 0 10px 0"
        },
        "& svg.button": {
            "&:hover": {
                cursor: "pointer"
            }
        }
    },
    buttons: {
        textAlign: "center",
        "& a": {
            margin: "20px 10px"
        }
    },
    loadingUserInfo: {
        position: "absolute",
        left: "50%"
    }
};

class Profile extends Component {
    render() {
        dayjs.locale(locale);
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        // Double ternaire : Si on est en 'loading=true' on affiche 'Chargement' sinon on verifie si on est authentifier.
        // Si on est authentifier, on affiche les infos du user, sinon on affiche un message avec 2 boutons (login / signup)
        // !loading ? (authenticated ? (user data) : (signup / login) ) : (Loading message)
        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src={imageUrl} alt="profile" className="profile-image" />
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink
                                component={Link}
                                to={`/user/${handle}`}
                                color="primary"
                                variant="h6"
                            >
                                @{handle}
                            </MuiLink>
                            <hr />
                            {bio && <Typography variant="body2">{bio}</Typography>}
                            <hr />
                            {location && (
                                <Fragment>
                                    <LocationOn color="primary" /> <span>{location}</span>
                                    <hr />
                                </Fragment>
                            )}
                            {website && (
                                <Fragment>
                                    <LinkIcon color="primary" />
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                        {" "}
                                        {website}
                                    </a>
                                    <hr />
                                </Fragment>
                            )}
                            <CalendarToday color="primary" />{" "}
                            <span>A rejoint Scream! en {dayjs(createdAt).format("MMMM YYYY")}</span>
                        </div>
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        Aucun profil trouvé, veuillez vous connecter.
                    </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to={"/login"}>
                            Connexion
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to={"/signup"}
                        >
                            Inscription
                        </Button>
                    </div>
                </Paper>
            )
        ) : (
            <CircularProgress size={30} className={classes.loadingUserInfo} />
        );

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(withStyles(styles)(Profile));
