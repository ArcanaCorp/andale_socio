import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom"

export default function EditProduct () {

    const navigate = useNavigate();

    return (

        <>
        
            <header className="__header_new">
                <button className="__btn_back" onClick={() => navigate('/panel')}><IconArrowLeft size={18} /></button>
                <h3>Editar producto</h3>
            </header>

            <div></div>

        </>

    )

}