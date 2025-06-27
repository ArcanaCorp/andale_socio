import Cookies from "js-cookie";
import { URL_API } from "../config"

export const serviceListCategories = async () => {

    try {
        
        const sub = Cookies.get('andale_socio');
        const response = await fetch(`${URL_API}/categories`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${sub}`
            }
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

            return data;
        
    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }

}

export const serviceCreateCategory = async (category) => {
    try {
        
        const sub = Cookies.get('andale_socio');
        const response = await fetch(`${URL_API}/category/create`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${sub}`
            },
            body: JSON.stringify({category})
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

            return data;
        
    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }
}