import React, { Component } from "react";
import { Link } from "react-router-dom";

//Material-ui stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class Navbar extends Component {
    render() {
        return (
            <div>
                <AppBar>
                    <Toolbar className="navbar-container">
                        <Button color="inherit" component={Link} to="/">
                            Accueil
                        </Button>
                        <Button color="inherit" component={Link} to="/login">
                            Se connecter
                        </Button>
                        <Button color="inherit" component={Link} to="/signup">
                            S'inscrire
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;
