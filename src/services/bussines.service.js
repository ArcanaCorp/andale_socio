import { URL_API } from "../config"
import Cookies from "js-cookie"

export const serviceInfoAccount = async () => {
    try {
        
        const sub = Cookies.get('andale_socio');
        const response = await fetch(`${URL_API}/account`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${sub}`
            }
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);
        
            return data;

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }
}

export const serviceUpdateAccount = async (payload) => {
    try {
        
        const sub = Cookies.get('andale_socio');
        const response = await fetch(`${URL_API}/account`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${sub}`
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);
        
            return data;

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }
}

export const serviceUpdateAccountPhoto = async (payload) => {
    try {
        
        const sub = Cookies.get('andale_socio');
        const response = await fetch(`${URL_API}/account/photo`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${sub}`
            },
            body: payload
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);
        
            return data;

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }
}