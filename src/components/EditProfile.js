import { IconPencil, IconCheck } from "@tabler/icons-react";
import { categories } from "../utils/categories";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import { serviceUpdateAccount } from "../services/bussines.service";

export default function EditProfile () {

    const { user } = useAuth();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory ] = useState('');
    const [subcategory, setSubCategory ] = useState('');
    const [address, setAddress] = useState("");

    const [editingField, setEditingField] = useState(null);

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

    const handleUpdateInfo = async () => {
        try {

            const payload = {
                ...(name.trim() && { name }),
                ...(description.trim() && { text: description }),
                ...(category && subcategory && { category, subcategory }),
                ...(address.trim() && { location: address })
            };

            // Si no hay datos válidos, no enviamos nada
            if (Object.keys(payload).length === 0) {
                toast.warning('Alerta', { description: "No hay datos válidos para actualizar." })
                setEditingField(null);
                return;
            }

            const data = await serviceUpdateAccount(payload)

            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })

        } catch (error) {
            toast.error('Error', { description: error.message })
        }
    }

    const handleEditClick = (field) => {
        if (editingField === field) {
            handleUpdateInfo();
            setEditingField(null);
        } else {
            setEditingField(field);
        }
    };


    return (

        <>
            
            <div className="__form_edit_group">
                <div className="__form_edit_control">
                    <input value={name} disabled={editingField !== "name"} placeholder={user?.name || 'Ingresa tu nuevo nombre'} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="__form_edit_control_btn">
                    <button className="__btn_edit" onClick={() => handleEditClick('name')}>
                        {editingField === "name" ? <IconCheck /> : <IconPencil />}
                    </button>
                </div>
            </div>

            <div className="__form_edit_group">
                <div className="__form_edit_control __form_edit_control_box">
                    <textarea value={description} disabled={editingField !== "description"} placeholder={user?.text || "Ingresa tu nueva descripción"} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="__form_edit_control_btn __form_edit_control_btn--row">
                    <button className="__btn_edit" onClick={() => handleEditClick('description')}>
                        {editingField === "description" ? <IconCheck /> : <IconPencil />}
                    </button>
                </div>
            </div>

            <div className="__form_edit_group">
                <div className="__form_edit_control">
                    <select value={subcategory} disabled={editingField !== "category"} defaultValue={''} onChange={changeCategory}>
                        <option value={''} selected hidden>{user?.sub_category || 'Selecciona tu categoria'}</option>
                        {Object.entries(categories).map(([index, category]) => (
                            <optgroup key={index} label={index}>
                                {category.map((c) => ( <option key={c} value={c}>{c}</option> ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div className="__form_edit_control_btn">
                    <button className="__btn_edit" onClick={() => handleEditClick('category')}>
                        {editingField === "category" ? <IconCheck /> : <IconPencil />}
                    </button>
                </div>
            </div>

            <div className="__form_edit_group">
                <div className="__form_edit_control">
                    <input value={address} disabled={editingField !== "address"} placeholder={user?.location || "Ingresa tu nueva dirección"} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="__form_edit_control_btn">
                    <button className="__btn_edit" onClick={() => handleEditClick('address')}>
                        {editingField === "address" ? <IconCheck /> : <IconPencil />}
                    </button>
                </div>
            </div>

        </>

    )

}