import axios from "axios";

const baseUrl = 'http://192.168.1.193:8000/gisa'
export async function signInRequest(data){
    let responseData
    try{
        const response = await axios({
            method: 'post',
            url: `${baseUrl}/auth/account/login`,
            data
        });

     responseData = await response.data;

     const {token, user} = responseData;

     return {
        token,
        user
    }
    }catch(error){
        throw error
    }
}

export async function signUpRequest(data){
    let responseData
    try{
        const response = await axios({
            method: 'post',
            url: `${baseUrl}/auth/account/register`,
            data
        });

        responseData = await response.data;

        const {token, user} = responseData;

        return{
            token,
            user
        }
    }catch(error){
        throw error
    }
}

export async function getUserInfo(token){
    let responseData
    try{
        const response = await axios({
            method: 'get',
            url: `${baseUrl}/auth/account/userinfo`,
            headers: {"access_token" : token}
        });

     responseData = await response.data;

     const {user} = responseData;

     return {
        user
    }
    }catch(error){
        throw error
    }
}