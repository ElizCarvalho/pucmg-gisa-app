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

export async function getRefunds(){
    let responseData;

    try{
        const response = await axios({
            method: 'GET',
            url: `${baseURL}/refund`,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        responseData = response.data
        return responseData;
    }catch(error){
        throw error
    }
}

export async function getRefundById(refundId){
    let responseData;

    try{
        const response = await axios({
            method: 'GET',
            url: `${baseURL}/refund/${refundId}`,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        responseData = response.data
        return responseData;
    }catch(error){
        throw error
    }
}

export async function updateRefundById(refundId, data){
    let responseData;

    data.id = refundId;
    try{
        const response = await axios({
            method: 'PUT',
            url: `${baseURL}/refund/${refundId}`,
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