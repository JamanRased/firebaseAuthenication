import React, { useState } from 'react';
import initializeAuthentication from '../Firebase/firebase.initialize';
import { GoogleAuthProvider,GithubAuthProvider,getAuth, signInWithPopup,signOut } from "firebase/auth";
import './Login.css';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const auth = getAuth(); 

const Login = () => {
    const [user, setUser] = useState([]);
    const handleGoogleSignIn = () =>{    
        signInWithPopup(auth, googleProvider)
        .then((result) => {
        // The signed-in user info.
        const {displayName, email, photoURL} = result.user;
        const logedInUser ={
            name: displayName,
            email: email,
            photo: photoURL
        };
        setUser(logedInUser);
        })
        .catch((error) => {
        console.log(error.message);
        });
    }
    const handleGithubSignIn = ()=>{
        signInWithPopup(auth, gitHubProvider)
        .then((result) => {
        // The signed-in user info.
        const {displayName, email, photoURL} = result.user;
        const logedInUser ={
            name: displayName,
            email: email,
            photo: photoURL
        };
        setUser(logedInUser);
        })
        .catch((error) => {
        console.log(error.message);
        });
    }
    const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            setUser({});
          })
    }    
    return (
        <div>
            <div className='main'>
                <h1>Firebase Authenication</h1>
                {!user.name ?
                    <div>
                        <button onClick={handleGoogleSignIn } className='btn-regular' >Google Sign In</button><br/>
                        <button onClick={handleGithubSignIn } className='btn-regular' >Github Sign In</button><br/>
                        <button className='btn-regular' >Facebook Sign In</button>
                    </div>:
                    <button onClick={handleSignOut} className='btn-regular' > Sign Out</button>
                }
                <br/>
                {
                    user.name &&<div>
                        <h2>Welcome :{user.name}</h2>
                        <img src={user.photo} alt='' />

                        </div>
                }
            </div>
        </div>
    );
};

export default Login;