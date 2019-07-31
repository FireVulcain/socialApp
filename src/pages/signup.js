import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/favicon.png";
import { Link } from "react-router-dom";

//MUI STUFF
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux stuff
import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/userActions";

const styles = {
    form: {
        textAlign: "center"
    },
    image: {
        width: "50%",
        margin: "20px auto"
    },
    pageTitle: {
        margin: "10px auto"
    },
    TextField: {
        margin: "5px auto"
    },
    button: {
        margin: "20px auto",
        position: "relative"
    },
    customError: {
        color: "red",
        marginTop: "5px"
    },
    progress: {
        position: "absolute"
    }
};

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            handle: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signUpUser(newUserData, this.props.history);
    };
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    render() {
        const {
            classes,
            UI: { loading }
        } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="scream" className={classes.image} />
                    <Typography variant="h4" className={classes.pageTitle}>
                        Inscription
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.TextField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Mot de passe"
                            className={classes.TextField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirmation mot de passe"
                            className={classes.TextField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="Pseudo"
                            className={classes.TextField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >
                            Inscription
                            {loading && <CircularProgress size={30} className={classes.progress} />}
                        </Button>
                        <br />
                        <small>
                            Vous avez déjà un compte ? Connectez-vous <Link to={"/login"}>ici</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { signUpUser }
)(withStyle(styles)(Signup));
