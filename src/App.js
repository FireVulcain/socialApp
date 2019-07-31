import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

//Components
import Navbar from "./components/Navbar";

const token = localStorage.getItem("fireBaseIdToken");
let authenticated;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = "/login";
        authenticated = false;
    } else {
        authenticated = true;
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <AuthRoute
                                exact
                                path="/login"
                                component={Login}
                                authenticated={authenticated}
                            />
                            <AuthRoute
                                exact
                                path="/signup"
                                component={Signup}
                                authenticated={authenticated}
                            />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
