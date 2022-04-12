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
        console.log("Deu problema aqui")
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

// export async function getUserInfo(token){

// }