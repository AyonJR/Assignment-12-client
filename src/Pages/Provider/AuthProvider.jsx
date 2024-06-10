import { createContext, useState, useEffect } from "react";
import {
    getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,
    signOut, updateProfile, updateEmail
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser)
            if(currentUser){
                const userInfo = {email : currentUser.email}
                axiosPublic.post('/jwt' , userInfo)
                .then(res => {
                    console.log(res)
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [axiosPublic]);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const loginUserWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (profileData) => {
        setLoading(true);
        try {
            if (user) {
                await updateProfile(user, {
                    displayName: profileData.displayName,
                    photoURL: profileData.photoURL,
                });
               
                if (profileData.email && profileData.email !== user.email) {
                    await updateEmail(user, profileData.email);
                }
                const updatedUser = { ...user, ...profileData };
                setUser(updatedUser);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const userInfo = {
        user,
        loading,
        createUser,
        loginUser,
        loginUserWithGoogle,
        logoutUser,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
