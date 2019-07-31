import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropsType from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated === true ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

AuthRoute.propType = {
    user: PropsType.object.isRequired
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
