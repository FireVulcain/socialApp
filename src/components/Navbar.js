import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CustomButton from "../util/CustomButton";

//Material-ui stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

//Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";

//Redux Stuff
import { connect } from "react-redux";

class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <div>
                <AppBar>
                    <Toolbar className="navbar-container">
                        {authenticated ? (
                            <Fragment>
                                <CustomButton tip="Scream!">
                                    <AddIcon />
                                </CustomButton>
                                <Link to="/">
                                    <CustomButton tip="Accueil">
                                        <HomeIcon />
                                    </CustomButton>
                                </Link>
                                <CustomButton tip="Notifications">
                                    <NotificationsIcon />
                                </CustomButton>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/">
                                    Accueil
                                </Button>
                                <Button color="inherit" component={Link} to="/login">
                                    Se connecter
                                </Button>
                                <Button color="inherit" component={Link} to="/signup">
                                    S'inscrire
                                </Button>
                            </Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
