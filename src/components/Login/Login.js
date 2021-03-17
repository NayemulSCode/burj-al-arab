import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
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
            console.log(loggedInUser);
            //console.log(result.user);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} >Google sign in</button>
        </div>
    );
};

export default Login;