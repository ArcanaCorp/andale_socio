import { URL_API } from "../config"
import Cookies from "js-cookie"

export const serviceListProduct = async () => {

    try {
        
        const response = await fetch(`${URL_API}/product/list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('andale_socio')}`
            }
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);
        
            return data

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }

}

export const serviceAddProduct = async (formData) => {
    try {
        
        const response = await fetch(`${URL_API}/product/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('andale_socio')}`
            },
            body: formData
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);
        
            return data

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }        
    }
}

export const serviceDeleteProduct = async (productId) => {
    try {
        
        const response = await fetch(`${URL_API}/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${Cookies.get('andale_socio')}`
            }
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);
        
            return data;

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }
}