import { createContext, useState, useEffect } from "react";
import { getUserInfo, signInRequest, signUpRequest } from "../services/auth";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";


export const AuthContext = createContext({})

export function AuthProvider({children}){

    const [user, setUser] = useState(); 

    const isAuthenticated = !!user;
        
   useEffect(() => {
        const { 'gisa-token': token } = parseCookies();

        if(token){
            getUserInfo(token).then((response) => setUser(response.user))
        }        
    }, [])


    async function signIn({email, password, latitude, longitude}){

        try{
            const { token, user } = await signInRequest({
                email, 
                password,
                latitude, 
                longitude

            });
            setCookie(undefined, 'gisa-token', token, {
                maxAge: 60 * 60 * 1, // 1 hora 
                path: '/'
            });
            
            setUser(user);
            Router.push("/dashboard");
        }catch(error){
            throw error;
        }
    }

    async function signUp({email, role, password, confirmPassword, latitude, longitude}){

        try{
            const { token, user } = await signUpRequest({
                email, 
                role, 
                password,
                confirmPassword,
                latitude,
                longitude
            }); 
            setCookie(undefined, 'gisa-token', token, {
                maxAge: 60 * 60 * 1,
                path: '/'
            });
            
            setUser(user);
            Router.push('/dashboard');
        }catch(error){
            throw error.response
        }
    }

    async function signOut(){
        try{
            destroyCookie(undefined, 'gisa-token');
            Router.push('/account/login')
        }catch(error){
            throw error.response
        }

    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
            { children }
        </AuthContext.Provider>
    ) 
}