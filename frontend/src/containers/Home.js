import React from 'react';
import {Link} from 'react-router-dom';
import {logout, setAlert} from "../actions/auth";
import {connect} from "react-redux";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Alert} from "../components/Alert";

const Home = ({logout, isAuthenticated}) => {

    const logout_user = () => {
        logout();
    };

    return (

        <>
            <ToastContainer position={"top-center"}/>

            <div className='container'>
                <div className='jumbotron mt-5'>
                    <h1 className="display-4">Welcome to Auth System!</h1>
                    <p className='lead'>This is an incredible authentication system with
                        production level features!</p>
                    <hr className="my-4"/>
                    <p>Click the Log In button</p>
                    <Link className="btn btn-primary btn-lg m-2" to='/login' role='button'>
                        Login
                    </Link>
                    {isAuthenticated &&

                        <a className='btn btn-danger btn-lg m-2' onClick={logout_user}>
                            Logout
                        </a>
                    }

                </div>
            </div>
        </>

    );

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {logout})(Home);

// export default Home;
