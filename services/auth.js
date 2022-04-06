import axios from "axios";


const baseUrl = 'http://192.168.10.20:8000/gisa'
export async function signInRequest(data){
    let responseData
    try{
        const response = await axios({
            method: 'post',
            url: `${baseUrl}/auth/login`,
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
            url: `${baseUrl}/auth/register`,
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