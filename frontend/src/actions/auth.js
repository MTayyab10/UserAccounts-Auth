import axios from 'axios';
// import process from "process";
// import { setAlert } from './alert';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    RESEND_ACTIVATION_SUCCESS,
    RESEND_ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT
} from './types';


export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
            console.log(err)
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
};

export const googleAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);

            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
        }
    }
};

export const facebookAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`, config);

            dispatch({
                type: FACEBOOK_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            dispatch({
                type: FACEBOOK_AUTH_FAIL
            });
        }
    }
};

export const checkAuthenticated = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
                console.log("Auth Success", res.status, res.statusText)

            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
                // console.log(res.data.code)

            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
            console.log("Auth Fail", err)
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
        // console.log("Error is here too")
    }
};

// Login sys is working perfectly

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        console.log("Login Success", res.data)
        alert("You has been login.")
        // alert(res.data)

        dispatch(load_user())

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        })
        // alert(JSON.stringify(err.response.data))
        alert(err.response.data.detail)
        console.log("Invalid Email or Password, Try again.");
        console.log(err.response.data)
        // dispatch()
    }
};

export const signup = ( // first_name, last_name,
    name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        // first_name, last_name,
        name, email, password, re_password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data

        });

        alert("Your account has been created")
        console.log("Signup Success ", res.data)

    } catch (err) {

        dispatch({
            type: SIGNUP_FAIL
        })

        alert(err.response.data.detail)
        console.log(err.response.data, "Msg is", err.response.data.message)
        console.log("Signup fail error:", err)

        // if (err.response) {
        //
        //     dispatch({
        //         type: SIGNUP_FAIL,
        //         payload: err.response.data.message,
        //     });
        //
        //     setErrorHandler({
        //         hasError: true,
        //         message: err.response.data.message,
        //     });
        // }
    }

};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token});

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
        console.log("User is activated",)

    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
        console.log(err.response.data)
        console.log("Activation fail error", err)
    }
};

export const resend_verify = (email) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email})

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/resend_activation/`, body, config)

        dispatch({
            type: RESEND_ACTIVATION_SUCCESS
        })
        alert("Resend Activation Success")

        console.log("Resend Activation Success");

    } catch (err) {
        dispatch({
            type: RESEND_ACTIVATION_FAIL,
        })

        alert("Resend Activation Fail")
        console.log(err.response.data)
        console.log("Error for Resend Activation", err)
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email});

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
        console.log("Reset Password Success");

    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL,
        });
        // alert(JSON.stringify(err.response.data))
        alert("Reset Password Fail")
        console.log(err.response.data.detail)
        console.log("Error for Rest Password", err)
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token, new_password, re_new_password});

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        });
        console.log("Password has been reset.")

    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
        // alert(JSON.stringify(err.response.data))
        console.log(err.response.data.detail)
        console.log("Reset Password Fail", err)
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    alert("You has been logout.")
};