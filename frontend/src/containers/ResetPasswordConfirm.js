import React, {useState} from 'react';
import {Navigate, useMatch} from 'react-router-dom';
import {connect} from 'react-redux';
import {reset_password_confirm} from '../actions/auth';


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

    let errorMsg;

    const onSubmit = e => {
        e.preventDefault();

        // const uid = this.props.match.params.uid;
        const uid = match.params.uid
        const token = match.params.token;

        if (new_password !== re_new_password) {
            errorMsg = "Password didn't matched."
            alert("Password didn't matched.");
            console.log(errorMsg)

        } else {
            alert("Successfully, your password has been reset.")
            reset_password_confirm(uid, token, new_password, re_new_password);
            setRequestSent(true);
        }

    };

    if (requestSent) {
        console.log("Password changed successfully")
        return <Navigate to='/login'/>
    }
    //  else {
    //     return <Navigate to='/password/reset/confirm/:uid/:token' />
    // };

    return (
        <div className='container mt-5'>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <br/>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>

                <h3>This is some {errorMsg}</h3>

                <button className='btn btn-primary p-2' type='submit'>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default connect(null, {reset_password_confirm})(ResetPasswordConfirm);
