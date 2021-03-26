import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLogin = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then((result) => {
        const {displayName, email} = result.user;
        const loggedInUser = {name: displayName, email};
        return loggedInUser;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorMessage,errorCode);
    });
}
// sign out
export const handleSignOut = () =>{
    return firebase.auth().signOut()
    .then( res =>{
        const loggedInUser = res.user;
        const signedOutUser = {
            isSignedIn: false,
            name: '',
            email: ''
        }
        return signedOutUser;
    }).catch(error =>{
        const errorMessage = error.message;
        console.log(errorMessage);
    })
}