import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {logout} from "../actions/auth";
import {NavLink} from "react-router-dom";
import Alert from "../containers/Alert";
import {ToastContainer} from "react-toastify";


const Navbar = ({logout, isAuthenticated}) => {

    const [redirect, setRedirect] = useState(false);

    // User Name

    const logout_user = () => {
        logout();
        setRedirect(true);
    };


    // If user is not login/authenticated

    const guestLinks = () => (
        <Fragment>

            <li className="nav-item">
                <NavLink to="/login" className="nav-link" >
                    Login
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/signup" className="nav-link" >
                    Sign Up
                </NavLink>
            </li>
        </Fragment>
    );

    // If user is login/authenticated

    const authLinks = () => (
        <>
            {/*Hello to Authenticated User*/}

            <li className='nav-item'>
                <a className='nav-link'
                   href='#'>
                    Hello, {isAuthenticated ? "True" : "False"}
                </a>
            </li>

            {/*Logout*/}

            <li className='nav-item'>
                <a className='nav-link' href='#'
                   onClick={logout_user}>Logout</a>
            </li>
        </>
    );

    return (
        <Fragment>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">

                    <Link className='navbar-brand' to='/'>
                        Auth System
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse"
                         id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">

                                {/*<Link className={}*/}
                                {/*    // className="nav-link active"*/}
                                {/*      to='/'>Home</Link>*/}
                                <NavLink to={"/"} className="nav-link">
                                    Home
                                </NavLink>
                            </li>

                             {isAuthenticated ? authLinks() : guestLinks()}

                        </ul>

                    </div>
                </div>
            </nav>

            <Alert />
            {/*<nav className='navbar navbar-light bg-light'>*/}

            {/* <Link className='navbar-brand' to='/'>Auth System</Link>*/}

        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(Navbar);