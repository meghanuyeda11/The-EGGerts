import React, { useState } from 'react';
import './login.css'
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    .then(data => data.json())
}

function Login({ setLogin }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setLogin(token);
    }

    return (
        <div className="login">
            <div className = "login-inner">
                <h1>Please Log In</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                    </label>
                    <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <div>
                    <p></p>
                    <button type="submit">Submit</button>
                    </div>
                </form>
            </div>            
        </div>
    );
}

export default Login

Login.propTypes = {
    setLogin: PropTypes.func.isRequired
}