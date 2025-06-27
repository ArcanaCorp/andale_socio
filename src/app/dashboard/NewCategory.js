import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

import './styles/new.css'
import { serviceCreateCategory } from "../../services/category.service";

export default function NewCategory () {

    const navigate = useNavigate();
    const { action } = useParams();

    const [ category, setCategory ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const tit = action === 'new' ? 'Crea un nueva categoria' : 'Editar categoria'

    const handleUpdateCategory = async () => {}

    const handleCreatedCategory = async () => {
        
        if (!category) return toast.warning('Alerta', { description: 'Ingresa una categoria antes de continuar' })

        try {
            
            setLoading(true)
            const data = await serviceCreateCategory(category)
            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setCategory('')
            setLoading(false)
        }
    }

    const handleClick = () => {
        if (action === 'new') {
            handleCreatedCategory()
        } else {
            handleUpdateCategory();
        }
    }

    return (

        <>
        
            <header className="__header_new">
                <div className="__col">
                    <button className="__btn_back" onClick={() => navigate('/panel')}><IconArrowLeft size={18} /></button>
                    <h3>{tit}</h3>
                </div>
            </header>

            <main className="__main_new">

                <div className="__form">

                    <div className="__form_group">
                        <label className="__label" htmlFor="name_category">Ingresa la categoria</label>
                        <div className="__form_control">
                            <input type="text" className="__form_entry" id="name_category" value={category} placeholder="Ingresa la categoria" onChange={(e) => setCategory(e.target.value)} />
                        </div>
                    </div>

                    <div className="__form_group">
                        <button className="__btn __btn_primary" onClick={handleClick}>
                            {loading ? <span className="__loader"></span> : action === 'new' ? 'Crear' : 'Editar'}
                        </button>
                    </div>

                </div>

            </main>

            <Toaster position="top-center" richColors/>

        </>

    )

}