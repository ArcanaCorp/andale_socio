import { IconPhone } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { serviceLogin } from "../../services/auth.service";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login () {

    const navigate = useNavigate();
    const [ phone, setPhone ] = useState('')
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const changePhone = (e) => {
        const { value } = e.target;
        const isValidPhone = /^9\d{8}$/.test(value);
        if (!isValidPhone) {
            setError('Ingresa un número válido debe tener 9 dígitos.')
        } else {
            setError('')
            setPhone(value)
        }
    }

    const handleLogin = async () => {

        const phoneTrimmed = phone.trim();
        const isValidPhone = /^9\d{8}$/.test(phoneTrimmed);

        if (!isValidPhone) return toast.warning('Alerta', { description: 'Ingresa un número válido por favor.' })

        try {

            setLoading(true)
            
            const data = await serviceLogin(phone)

            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                Cookies.set('andale_socio', data.token, { expires: 365 })
                toast.success('Éxito', { description: data.message })
                navigate('/verify')

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }

    }

    return (

        <>
        
            <div className="__form_group">
                <label htmlFor="phone" className="__label">Ingresa tu número telefónico</label>
                <div className="__form_control">
                    <span className="__form_ico"><IconPhone size={18} strokeWidth={1.2} stroke={'#888888'} /></span>
                    <input type="tel" inputMode="numeric" pattern="[0-9]*" className="__form_entry" id="phone" minLength={9} maxLength={9} placeholder="Ingresa tu número de teléfono" onChange={(e) => changePhone(e)} />
                </div>
                {error !== '' && ( <span className="__form_alert">* {error}</span> )}
            </div>

            <div className="__form_group">
                <button className={`__btn __btn_primary ${phone.length < 9 && '__btn_disabled'}`} disabled={phone.length < 9 ? true : false} onClick={handleLogin}>
                    {loading ? <span className="__loader"></span> : 'Continuar'}
                </button>
            </div>

        </>

    )

}