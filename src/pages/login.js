import React, { Component } from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/favicon.png";
import axios from "axios";
import { Link } from "react-router-dom";

//MUI STUFF
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

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

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            loading: false,
            errors: {}
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        axios
            .post("/login", userData)
            .then((response) => {
                localStorage.setItem("fireBaseIdToken", `Bearer ${response.data.token}`);
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                });
            });
    };
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    render() {
        const { classes } = this.props;
        const { loading, errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="scream" className={classes.image} />
                    <Typography variant="h4" className={classes.pageTitle}>
                        Connexion
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
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Connexion
                            {loading && <CircularProgress size={30} className={classes.progress} />}
                        </Button>
                        <br />
                        <small>
                            Vous n'avez pas de compte ? Inscrivez-vous <Link to={"/signup"}>ici</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyle(styles)(Login);
