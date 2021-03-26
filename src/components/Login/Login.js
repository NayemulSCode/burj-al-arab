import React, { useContext } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleGoogleSignIn, handleSignOut, initializeLogin } from './loginManager';
import { useState } from 'react';


const Login = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: ''
    });
    console.log(user);
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
    const signOut =() =>{
        handleSignOut()
        .then(res =>{
            handleResponse(res, false);
        })
    }
    const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
       if(redirect){
        history.replace(from);
       }
    }
    return (
        <div style={{height: '300px', width: '300px', backgroundColor:'blue'}}>
            {
                user.isSignedIn ? <button onClick={signOut}>Sign out</button>:
                <button onClick={googleSignIn} >Google sign in</button>
            }
            
        </div>
    );
};

export default Login;