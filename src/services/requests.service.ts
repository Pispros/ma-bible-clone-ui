import { useToast } from '@chakra-ui/react';
import axios from 'axios';
const toast = useToast();

export const getRequest = async (url: string) => {
    try {
        return await axios.get(url);
    } catch (error) {
        console.log(error);
        toast({
            title: "Oops",
            description: "Quelque chose s'est mal passé, veuillez reéssayer plus tard."
        });
        return error;
    }
}

export const postRequest = async (url: string, payload: any) => {
    try {
        return await axios.post(url, payload);
    } catch (error) {
        console.log(error);
        toast({
            title: "Oops",
            description: "Quelque chose s'est mal passé, veuillez reéssayer plus tard."
        });
        return error;
    }
}

export const updateRequest = async (url: string, payload: any) => {
    try {
        return await axios.put(url, payload);
    } catch (error) {
        console.log(error);
        toast({
            title: "Oops",
            description: "Quelque chose s'est mal passé, veuillez reéssayer plus tard."
        });
        return error;  
    }
}

export const deleteRequest = async (url: string) => {
    try {
        return await axios.delete(url);
    } catch (error) {
        console.log(error);
        toast({
            title: "Oops",
            description: "Quelque chose s'est mal passé, veuillez reéssayer plus tard."
        });
        return error;
    }    
}