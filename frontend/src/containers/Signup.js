import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {connect, useDispatch, useSelector} from 'react-redux';
import {signup} from '../actions/auth';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {setAlert} from "../actions/alert";


const Signup = ({ signup, isAuthenticated }) => {

    const [accountCreated, setAccountCreated] = useState(false);

    const [formData, setFormData] = useState({
        // first_name: '',
        // last_name: '',
        name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { name,
        // first_name, last_name,
        email, password, re_password } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {

        e.preventDefault();

        if (password !== re_password) {
            toast.error("Passwords didn't matched, Try again.",
                {position: "top-center"})

        } else {
            signup(name, email, password, re_password);
            setAccountCreated(true)
        }
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    // if (accountCreated) {
    //     return <Navigate to='/activate/sent' />
    // }

    // Bootstrap To handle the Form Validation

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    })()


    return (
        <div className='container mt-2'>

            <h2 className={"text-center p-2"}>Register</h2>

            {/*Official Docs https://fkhadra.github.io/react-toastify/introduction*/}

            {/*This is just to display password didn't match error.*/}

            <ToastContainer />

            <form onSubmit={e => onSubmit(e)}
                  className="row g-3 needs-validation" noValidate>

                <div className="col-md-4 offset-1 col-10">

                    <label htmlFor="validateFirstName"
                           className="form-label">
                        Username
                    </label>

                    <input type="text"
                           className="form-control"
                           id="validateFirstName"
                           // placeholder='Email'
                           name="name"
                           value={name}
                           onChange={e => onChange(e)}
                           required/>
                    {/*<div className="valid-feedback">*/}
                    {/*    Looks good!*/}
                    {/*</div>*/}
                    <div className="invalid-feedback">
                        Please provide a name.
                    </div>
                </div>

                 <div className="col-md-4 offset-1 col-10">

                    <label htmlFor="validateEmail"
                           className="form-label">
                        Email
                    </label>

                    <input type="email"
                           className="form-control"
                           id="validateEmail"
                           // placeholder='Email'
                           name='email'
                           value={email}
                           onChange={e => onChange(e)}
                           required/>
                    {/*<div className="valid-feedback">*/}
                    {/*    Looks good!*/}
                    {/*</div>*/}
                    <div className="invalid-feedback">
                        Please provide a email.
                    </div>
                </div>

                <div className="col-md-4 offset-1 col-10">

                    <label htmlFor="validatePassword" className="form-label">
                        Password
                    </label>

                    <input type="password"
                           className="form-control"
                           id="validatePassword"
                           name='password'
                           value={password}
                           onChange={e => onChange(e)}
                           required
                           minLength='6'
                           autoComplete={"true"} />
                    {/*<div className="valid-feedback">*/}
                    {/*    Looks good!*/}
                    {/*</div>*/}
                    <div className="invalid-feedback">
                        Please provide a password.
                    </div>
                </div>

                <div className="col-md-4 offset-1 col-10">

                    <label htmlFor="validateConfirmPassword" className="form-label">
                        Confirm Password
                    </label>

                    <input type="password"
                           className="form-control"
                           id="validateConfirmPassword"
                           name="re_password"
                           value={re_password}
                           onChange={e => onChange(e)}
                           required
                           minLength='6'
                           autoComplete={"true"}/>
                    {/*<div className="valid-feedback">*/}
                    {/*    Looks good!*/}
                    {/*</div>*/}
                    <div className="invalid-feedback">
                        Please provide a password.
                    </div>
                </div>

                {/* SingIn Option */}

                <div className="text-center">

                    <span className="">
                        Already have an
                        Account? <Link to="/login"
                                       className="text-decoration-none">
                         Sign In </Link>
                    </span>

                </div>

                {/*  Submit  */}

                <div className="col-md-8 offset-1 col-10">
                    <button className="btn btn-primary" type="submit">
                        Sign Up
                    </button>

                    <hr />

                </div>
            </form>

            {/* Login with Google & Fb, Socials */}

             <div className={"col-md-8 offset-1 col-10"}>

                <button className="btn btn-danger btn-sm me-2" onClick={continueWithGoogle}>
                    Continue With Google
                </button>

                <button className="btn btn-primary btn-sm" onClick={continueWithFacebook}>
                    Continue With Facebook
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors,
});


export default connect(mapStateToProps, { signup })(Signup);
