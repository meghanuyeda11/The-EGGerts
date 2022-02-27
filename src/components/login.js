import React from 'react';
import './login.css'

function Login(props) {
    return (props.trigger) ? (
        <div className="login">
            <div className = "login-inner">
                <h1>Please Log In</h1>
                <form>
                    <label>
                    <p>Username</p>
                    <input type="text" />
                    </label>
                    <label>
                    <p>Password</p>
                    <input type="password" />
                    </label>
                    <div>
                    <p></p>
                    <button type="submit">Submit</button>
                    </div>
                </form>
                { props.children }
            </div>            
        </div>
    ) : "";
}

export default Login