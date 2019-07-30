import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Scream from "./../components/Scream";

class Home extends Component {
    state = {
        screams: null
    };

    componentDidMount() {
        axios
            .get("/screams")
            .then((response) => {
                this.setState({
                    screams: response.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map((scream) => {
                return <Scream key={scream.screamId} scream={scream} />;
            })
        ) : (
            <p>Chargement...</p>
        );
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profil...</p>
                </Grid>
            </Grid>
        );
    }
}

export default Home;
