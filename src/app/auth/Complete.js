import { IconBuildingStore, IconList, IconMapPin, IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../utils/categories";
import { toast } from "sonner";
import { serviceCompleted } from "../../services/auth.service";

export default function Complete () {

    const navigate = useNavigate();
    const [ name, setName ] = useState('');
    const [ text, setText ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ subcategory, setSubCategory ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ loading, setLoading ] = useState(false)

    const changeCategory = (e) => {
        const selectedSub = e.target.value;

        const parent = Object.entries(categories).find(([cat, subs]) =>
            subs.includes(selectedSub)
        );

        if (parent) {
            setCategory(parent[0]);
            setSubCategory(selectedSub);
        }
    }

    const handleCompleted = async () => {

        if (name === '' || text === '' || category === '' || subcategory === '' || location === '') return toast.warning('Alerta', { description: 'Tienes que completar los campos solicitados.' })

            try {
                
                setLoading(true)

                const formData = { name: name, text: text, category: category, subcategory: subcategory, location: location }
                const data = await serviceCompleted(formData)

                if (!data.ok) return toast.warning('Alerta', { description: data.message })

                    toast.success('Éxito', { description: data.message })
                    navigate('/login/completed/photo')

            } catch (error) {
                toast.error('Error', { description: error.message })
            } finally {
                setLoading(false)
            }

    }

    return (

        <>
        
            <div className="__form_group">
                <label className="__label" htmlFor="name">Ingresa el nombre de tu negocio</label>
                <div className="__form_control">
                    <span className="__form_ico"><IconBuildingStore size={18} strokeWidth={1.2} stroke={'#888888'} /></span>
                    <input type="text" inputMode="text" id="name" className="__form_entry" minLength={3} placeholder="Ingresa el nombre de tu negocio" onChange={(e) => setName(e.target.value)} />
                </div>
            </div>

            <div className="__form_group">
                <label className="__label" htmlFor="text">Describe tu negocio</label>
                <div className="__form_control">
                    <span className="__form_ico"><IconPencil size={18} strokeWidth={1.2} stroke={'#888888'} /></span>
                    <input type="text" inputMode="text" id="text" className="__form_entry" placeholder="Describe tu negocio" onChange={(e) => setText(e.target.value)}/>
                </div>
            </div>

            <div className="__form_group">
                <label className="__label" htmlFor="category">Selecciona la categoria de tu negocio</label>
                <div className="__form_control">
                    <span className="__form_ico"><IconList size={18} strokeWidth={1.2} stroke={'#888888'} /></span>
                    <select className="__form_entry" id="category" placeholder="Selecciona la categoria de tu negocio" defaultValue={''} onChange={(e) => changeCategory(e)}>
                        <option value={''} selected>Selecciona la categoria de tu negocio</option>
                        {Object.entries(categories).map(([index, category]) => (
                            <optgroup key={index} label={index}>
                                {category.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>

            <div className="__form_group">
                <label className="__label" htmlFor="location">Ingresa tu dirección</label>
                <div className="__form_control">
                    <span className="__form_ico"><IconMapPin size={18} strokeWidth={1.2} stroke={'#888888'} /></span>
                    <input type="text" inputMode="text" id="location" className="__form_entry" placeholder="Ingresa tu dirección" onChange={(e) => setLocation(e.target.value)} />
                </div>
            </div>

            <div className="__form_group">
                <button className={`__btn __btn_primary`} onClick={handleCompleted}>
                    {loading ? <span className="__loader"></span> : 'Completar'}
                </button>
            </div>

        </>

    )

}