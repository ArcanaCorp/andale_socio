import { URL_API } from "../config"
import Cookies from "js-cookie"

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