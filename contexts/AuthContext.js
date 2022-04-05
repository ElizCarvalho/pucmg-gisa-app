import { createContext, useState, useEffect } from "react";
import { signInRequest, signUpRequest } from "../services/auth";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/api";


export const AuthContext = createContext({})

export function AuthProvider({children}){

    const [user, setUser] = useState(); 

    const isAuthenticated = !!user;

        
//    useEffect(() => {
//         const { 'gisa-token': token } = parseCookies();

//         if(token){
//             getUserInfo.then((response) => setUser(response.user))
//         }        
//     }, [])


    async function signIn({email, password}){
        try{
            const { token, user } = await signInRequest({
                email, 
                password
            });
            setCookie(undefined, 'gisa-token', token, {
                maxAge: 60 * 60 * 1, // 1 hora 
                path: '/'
            });

            api.defaults.headers['acces-token'] = token;
            
            setUser(user);
            Router.push("/dashboard");
        }catch(error){
            console.log("Login incorreto. Tem certeza que colocou seus dados corretamente?");
            console.log(error);
        }
    }

    async function signUp({email, role, password, confirmPassword}){
        try{
            const { token, user } = await signUpRequest({
                email, 
                role, 
                password,
                confirmPassword
            }); 
            setCookie(undefined, 'gisa-token', token, {
                maxAge: 60 * 60 * 1,
                path: '/'
            });
            
            api.defaults.headers['acces-token'] = token;

            setUser(user);
            Router.push('/dashboard');
        }catch(error){
            throw error.response
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
            { children }
        </AuthContext.Provider>
    ) 
}