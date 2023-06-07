
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from 'axios'
import app from "../utils/firebase/firebase.config";


export const AuthContext = createContext(null);

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const createUser = (email, password) => {
        setUserLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email,password) => {
        setUserLoading(false)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = () => {
        setUserLoading(false)
        return signInWithPopup(auth,googleProvider)
    }

    const logOutUser = () => {
        setUserLoading(false)
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
      }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if(currentUser){
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {email: currentUser.email})
                .then(data =>{
                    localStorage.setItem('access-token', data.data.token)
                    setUserLoading(false);
                    console.log(data.data)
                })
            }
            else{
                localStorage.removeItem('access-token')
            }
        }) 
        return () => unsubscribe();

    },[])

    const authInfo = {
        user,
        userLoading,
        createUser,
        signIn,
        googleSignIn,
        logOutUser,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;
