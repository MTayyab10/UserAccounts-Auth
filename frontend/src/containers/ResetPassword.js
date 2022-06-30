import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {reset_password} from '../actions/auth';

const ResetPassword = ({reset_password}) => {

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const {email} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
         setRequestSent(true);
    };

    let msg;

    if (requestSent) {
        return <Navigate to='/reset-password/sent'/>
    } else
        msg = "There is some error."
    // else {
    //     return <Navigate to={'/reset-password'} />
    // };

    return (
        <div className="container">
            <div className="row">

                <div className="offset-md-3 col-md-6 offset-1 col-10">

                    <div className="p-3 text-center">
                        <h3><strong>Forgot Password</strong></h3>
                        {/*<i className="lead">*/}
                        {/*    Enter your email address and send.*/}
                        {/*</i>*/}
                    </div>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className='form-group'>

                            <label className="form-label" htmlFor="email">
                                Enter registered email
                            </label>

                            <input
                                className='form-control'
                                type='email'
                                placeholder='example@gmail.com'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>

                        <h3>{msg && msg}</h3>

                        <input type="submit" value="Rest Password"
                               className="btn btn-pill text-white btn-primary mt-3" />
                        {/*<button className='btn btn-primary' type='submit'>Reset Password</button>*/}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(null, {reset_password})(ResetPassword);