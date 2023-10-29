import axios from 'axios';

export const getRequest = async (url: string) => {
    return await axios.get(url);
}

export const postRequest = async (url: string, payload: any) => {
    return await axios.post(url, payload);
}

export const updateRequest = async (url: string, payload: any) => {
    return await axios.put(url, payload);
}

export const deleteRequest = async (url: string) => {
    return await axios.delete(url);
}