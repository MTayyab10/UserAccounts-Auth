import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
import {login, setAlert} from '../actions/auth';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    // errors from redux state
    // const {errors} = this.props
    // const {errors} = useSelector(state => state.errors)

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        // toast.success("You are login, Successfully.")
        login(email, password);
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

    // If user is authenticated
    // redirect to home page

    if (isAuthenticated) {
        return <Navigate to={'/'} />
    }

    // Bootstrap To handle the Form Validation

    // Example starter JavaScript for disabling form submissions
    // if there are invalid fields
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

            {/*Display error and success alerts*/}

            {/*<ToastContainer />*/}

            <h2 className={"text-center p-2"}>Sign In</h2>

            {/*<h4>{alert}</h4>*/}

            <form onSubmit={e => onSubmit(e)}
                  className="row g-3 needs-validation" noValidate>

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
                           autoComplete={"true"} />
                    {/*<div className="valid-feedback">*/}
                    {/*    Looks good!*/}
                    {/*</div>*/}
                    <div className="invalid-feedback">
                        Please provide a password.
                    </div>
                </div>

                {/* Remember & Forgot Password  */}

                <div className="col-md-4 offset-1 col-11">

                        <label className="me-4 pe-4"><span
                            className="caption">Remember me</span>
                            <input type="checkbox" className="small ms-1" />
                        </label>

                         <Link to={'/reset-password'}
                              className="text-decoration-none ms-4">
                            Forgot Password
                        </Link>
                </div>

                {/* SingUp Option */}

                <div className="text-center">

                    <span className="">
                        Don't have an
                        Account? <Link to="/signup"
                                       className="text-decoration-none">
                         Sign Up </Link>
                    </span>

                </div>

                {/*  Submit  */}

                <div className="col-md-8 offset-1 col-10">
                    <button className="btn btn-primary" type="submit">
                        Sign In
                    </button>

                    <hr />

                </div>
            </form>

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

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated,
    }
);

export default connect(mapStateToProps, {login})(Login);
