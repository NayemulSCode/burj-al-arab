import React, { useContext } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleGoogleSignIn, initializeLogin } from './loginManager';


const Login = () => {
    initializeLogin();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    const history = useHistory();
    const location = useLocation();
    
    const { from } = location.state || { from: { pathname: "/" } };
    
    const googleSignIn =() =>{
        handleGoogleSignIn()
        .then(res =>{
            handleResponse(res, true);
        })
    }
    const handleResponse = (res, redirect) =>{
        setLoggedInUser(res);
       if(redirect){
        history.replace(from);
       }
    }
    return (
        <div>
            <button onClick={googleSignIn} >Google sign in</button>
        </div>
    );
};

export default Login;