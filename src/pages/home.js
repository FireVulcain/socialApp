import React, { Component } from "react";
import PropTypes from "prop-types";

import Scream from "./../components/scream/Scream";
import Profile from "./../components/profile/Profile";

// MUI STUFF
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux stuff
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

const styles = {
    loadingUserInfo: {
        position: "absolute",
        left: "50%"
    }
};

class Home extends Component {
    componentDidMount() {
        this.props.getScreams();
    }

    render() {
        const { screams, loading } = this.props.data;
        const { classes } = this.props;

        let recentScreamsMarkup = !loading ? (
            screams.map((scream) => {
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

Home.propTypes = {
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    getScreams: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
});

export default connect(
    mapStateToProps,
    { getScreams }
)(withStyles(styles)(Home));
