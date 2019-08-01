import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Scream from "./../components/Scream";
import Profile from "./../components/Profile";

// MUI STUFF
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux stuff
import { connect } from "react-redux";

const styles = {
    loadingUserInfo: {
        position: "absolute",
        left: "50%"
    }
};

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
        const { classes } = this.props;

        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map((scream) => {
                return <Scream key={scream.screamId} scream={scream} user={this.props.user} />;
            })
        ) : (
            <CircularProgress size={30} className={classes.loadingUserInfo} />
        );
        return (
            <Grid container spacing={5}>
                <Grid item sm={8} xs={12} className="relativeElement">
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12} className="relativeElement">
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

Home.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Home));
