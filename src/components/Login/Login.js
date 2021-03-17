import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
   if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
   }
    const handleGoogleSignIn = () =>{
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const {displayName, email} = result.user;
            const loggedInUser = {name: displayName, email};
            setLoggedInUser(loggedInUser);
            history.replace(from);
            console.log(loggedInUser);
            //console.log(result.user);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorMessage,errorCode);
        });
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} >Google sign in</button>
        </div>
    );
};

export default Login;