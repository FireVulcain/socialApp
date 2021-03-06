import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import * as locale from "dayjs/locale/fr";
import EditDetails from "./EditDetails";
import CustomButton from "../../util/CustomButton";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux stuff
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

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
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById("imageUpload");
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    };
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
                            <input
                                type="file"
                                id="imageUpload"
                                onChange={this.handleImageChange}
                                hidden="hidden"
                            />
                            <CustomButton
                                tip="Changer de photo de profil"
                                onClick={this.handleEditPicture}
                                btnClassName="button"
                            >
                                <EditIcon color="primary" />
                            </CustomButton>
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
                            {bio && (
                                <Fragment>
                                    <Typography variant="body2">{bio}</Typography>
                                    <hr />
                                </Fragment>
                            )}
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
                        <hr />
                        <hr />
                        <CustomButton tip="Se déconnecter" onClick={this.handleLogout}>
                            <KeyboardReturn color="primary" />
                        </CustomButton>
                        <EditDetails />
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
const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Profile));
