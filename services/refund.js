import axios from "axios";
import { parseCookies } from "nookies";

const { "gisa-token": token } = parseCookies();

const baseURL = "http://192.168.1.193:8000/gisa/mic" 

export async function createRefund(data){
    let responseData;

    try{
        const response = await axios({
            method: 'POST',
            url: `${baseURL}/refund`,
            headers: {
                Authorization: `Bearer ${token}`    
            },
            data
        });

        responseData = await response.data;

    }catch(error){
        throw error
    }
}