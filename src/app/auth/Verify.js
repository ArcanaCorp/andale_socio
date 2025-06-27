import { IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { serviceVerify } from "../../services/auth.service";

export default function Verify () {

    const navigate = useNavigate();
    const [ code, setCode ] = useState('');
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const changeCode = (e) => {
        const { value } = e.target;
        const numericValue = value.replace(/\D/g, ''); // elimina todo lo que no sea número
        const isValidCode = /^\d{6}$/.test(numericValue);

        if (!isValidCode) {
            setError('Ingresa un código válido de 6 dígitos.');
        } else {
            setError('');
            setCode(numericValue); // o setPhone si sigue siendo para teléfono
        }
    };

    const handleVerify = async () => {
        try {

            setLoading(true)
            const data = await serviceVerify(code)
            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                if (data.completed) {
                    navigate('/panel')
                } else {
                    navigate('/completed')
                }
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (

        <>
        
            <div className="__form_group">
                <label className="__label" htmlFor="code">Ingresa el código de seguridad</label>
                <div className="__form_control">
                    <span className="__form_ico"><IconLock size={18} strokeWidth={1.2} stroke={'#888888'} /></span>
                    <input type="tel" inputMode="numeric" pattern="[0-9]*" className="__form_entry" id="code" minLength={6} maxLength={6} placeholder="Ingresa el código de seguridad" onChange={(e) => changeCode(e)} />
                </div>
                {error !== '' && ( <span className="__form_alert">{error}</span> )}
            </div>

            <div className="__form_group">
                <button className={`__btn __btn_primary ${code.length < 6 && '__btn_disabled'}`} disabled={code.length < 6 ? true : false} onClick={handleVerify}>
                    {loading ? <span className="__loader"></span> : 'Verificar'}
                </button>
            </div>

        </>

    )

}