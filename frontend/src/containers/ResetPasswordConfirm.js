import React, {useState} from 'react';
import {Navigate, useMatch} from 'react-router-dom';
import {connect} from 'react-redux';
import {reset_password_confirm} from '../actions/auth';
import {setAlert} from "../actions/alert";
import {toast, ToastContainer} from "react-toastify";


const ResetPasswordConfirm = ({ reset_password_confirm}) => {

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });

    const {new_password, re_new_password} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    let match = useMatch('/password/reset/confirm/:uid/:token');

    const onSubmit = e => {
        e.preventDefault();

        // const uid = this.props.match.params.uid;
        const uid = match.params.uid
        const token = match.params.token;

        if (new_password !== re_new_password) {
            toast.error("Passwords didn't matched, Try again.",
                {position: "top-center"})

        } else {
            setAlert("Successfully, your password has been reset.",
                "success")
            reset_password_confirm(uid, token, new_password, re_new_password);
            setRequestSent(true);
        }

    };

    if (requestSent) {
        console.log("Password changed successfully")
        return <Navigate to='/login'/>
    }


    return (
        <div className='container mt-3'>

            <ToastContainer />

            <h3 className={"text-center p-1"}>
                Set New Password
            </h3>

            <form onSubmit={e => onSubmit(e)}>

                <div className="col-md-4 offset-1 col-10">

                    <label htmlFor="validatePassword" className="form-label">
                        Password
                    </label>

                    <input type="password"
                           className="form-control"
                           id="validatePassword"
                           name='new_password'
                           value={new_password}
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

                <br />

                <div className="col-md-4 offset-1 col-10">

                    <label htmlFor="validateConfirmPassword" className="form-label">
                        Confirm Password
                    </label>

                    <input type="password"
                           className="form-control"
                           id="validateConfirmPassword"
                           name="re_new_password"
                           value={re_new_password}
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

                <button className='offset-1 btn btn-primary mt-3' type='submit'>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default connect(null, {reset_password_confirm})(ResetPasswordConfirm);
