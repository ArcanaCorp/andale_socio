import { URL_API } from "../config"
import Cookies from "js-cookie";

export const serviceLogin = async (phone) => {

    try {
        
        const response = await fetch(`${URL_API}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({phone})
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);
       
            return data

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }

}

export const serviceVerify = async (code) => {

    try {
        
        const response = await fetch(`${URL_API}/auth/verify`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('andale_socio')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({code})
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);
       
            return data

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }

}

export const serviceCompleted = async (formData) => {

    try {
        
        const response = await fetch(`${URL_API}/auth/completed`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('andale_socio')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);
        
            return data;

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }

}

export const serviceUploadPhoto = async (photo) => {

    try {
        
        const formData = new FormData()
        formData.append('photo', photo)

        const response = await fetch(`${URL_API}/auth/photo-profile`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('andale_socio')}`
            },
            body: formData
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);
        
            return data;


    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }

}