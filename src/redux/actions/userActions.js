import { SET_USER, SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post("/login", userData)
        .then((response) => {
            const fbIdToken = `Bearer ${response.data.token}`;
            localStorage.setItem("fireBaseIdToken", fbIdToken);
            axios.defaults.headers.common["Authorization"] = fbIdToken;
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

export const getUserData = () => (dispatch) => {
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
