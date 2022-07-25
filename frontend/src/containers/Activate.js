import React, { useState } from 'react';
import {Navigate, useMatch, useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Activate = ({ verify }) => {

    const [verified, setVerified] = useState(false);

    let match = useMatch('/activate/:uid/:token');

    let navigate = useNavigate()

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token, navigate);
        setVerified(true);
    };

    // if (verified) {
    //     // alert("Your account has been activated.")
    //     return <Navigate to='/login' />
    // }

    return (
        <div className='container'>
            <div 
                className='text-center'>

                <h2 className={"p-2"}>Verify your Account:</h2>

                <button
                    onClick={verify_account}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);
