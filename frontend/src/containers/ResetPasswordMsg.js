import React from "react";
import {Link} from "react-router-dom";


export default function ResetPasswordMsg() {

    return (

        <div className={""}>

            <div className={"offset-md-2 col-md-8"}>

                {/*<div className="alert alert-info alert-dismissible*/}
                {/*fade show p-2 text-center" role="alert">*/}

                {/*    Email Sent Successfully*/}

                {/*    <button type="button" className="btn-close small pt-4 pb-2" data-bs-dismiss="alert"*/}
                {/*            aria-label="Close"/>*/}
                {/*</div>*/}

                <div className={"container text-center"}>

                    <h2 className={"p-2"}>Password Reset Sent</h2>

                    <div className="alert alert-warning" role="alert">
                        {/*<h4 className="alert-heading">Well done!</h4>*/}
                        <p>
                            We've emailed you instructions for
                            your <i>Password Reset</i>, If an account exists with the email
                            you entered. You should receive a email, shortly.
                        </p>
                        <hr/>
                        <p className="mb-0">
                            If you don't receive any email please
                            check your spam/junk
                            box or <Link to={'#'} class={"text-decoration-none"}>
                            contact us</Link>.
                            {/* make sure you've entered the correct email addressed you */}
                            {/*/!*registered*!/ with and */}

                        </p>
                    </div>

                    {/*<p className={"lead"}>*/}
                    {/*    We've emailed you instructions for getting your password, if an account exists with the email you*/}
                    {/*    entered.*/}
                    {/*    You should receive a email, shortly.*/}
                    {/*    <br/>*/}
                    {/*    If you don't receive any email please make sure*/}
                    {/*    you've entered the correct email addressed you registered*/}
                    {/*    with and check your spam/junk box.*/}
                    {/*</p>*/}

                    {/*<button type="button" className="btn btn-primary">*/}
                    {/*Primary*/}
                    <Link to='/reset-password'
                          className="btn btn-primary m-3">
                        Send Email Again
                    </Link>
                    {/*</button>*/}

                    <Link to='/' className="btn btn-secondary">
                        Go to Home
                    </Link>

                </div>
            </div>

        </div>
    )

}