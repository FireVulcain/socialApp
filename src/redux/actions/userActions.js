import {
    SET_USER,
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_UNAUTHENTICATED,
    LOADING_USER
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post("/login", userData)
        .then((response) => {
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post("/signup", newUserData)
        .then((response) => {
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("fireBaseIdToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .get("/user")
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post("/user/image", formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => {
            console.error(err);
        });
};

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post("/user", userDetails)
        .then((res) => {
            console.log(res);
            dispatch(getUserData());
        })
        .catch((err) => {
            console.error(err);
        });
};

const setAuthorizationHeader = (token) => {
    const fbIdToken = `Bearer ${token}`;
    localStorage.setItem("fireBaseIdToken", fbIdToken);
    axios.defaults.headers.common["Authorization"] = fbIdToken;
};
