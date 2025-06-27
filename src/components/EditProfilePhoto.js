import { IconCamera, IconCheck } from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import { toast } from "sonner";
import { serviceUpdateAccountPhoto } from "../services/bussines.service";

export default function EditProfilePhoto () {

    const { user } = useAuth();
    const [ photo, setPhoto ] = useState(null);
    const [ photoURI, setPhotoURI ] = useState('')
    const [ hasNewPhoto, setHasNewPhoto ] = useState(false);
    const [ loading, setLoading ] = useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return toast.warning('Alerta', { description: 'No se pudo cargar la imagen' });
            setPhoto(file);
            setHasNewPhoto(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoURI(reader.result);  // Para preview inmediato
            };
            reader.readAsDataURL(file);
    };

    const handleUpdatePhoto = async () => {

        try {
            
            if (!photo) return toast.warning('Alerta', {description: 'Selecciona una foto antes de continuar'});

                setLoading(true)
                const formData = new FormData();
                formData.append("photo", photo);

                const data = await serviceUpdateAccountPhoto(formData)

                if (!data.ok) return toast.warning('Alerta', { description: data.message });

                    toast.success('Éxito', { description: data.message })
                    setPhotoURI(data.photo)

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
            setHasNewPhoto(false)
        }

    }

    return (

        <>
            <div className="__photo" style={{backgroundImage: `url(${photoURI === '' ? user?.photo : photoURI})`}}>
                <img src={`${photoURI === '' ? user?.photo : photoURI}`} alt={`Foto de ${user?.name} | ${user?.text} | Ándale Socio`} style={{display: 'none'}} loading="lazy" />
                <input type="file" style={{display: 'none'}} id="upload" accept="image/png, image/jpg, image/jpeg" onChange={handleFileChange}/>
                {!hasNewPhoto ? (
                    <label className="__upload" htmlFor="upload"><IconCamera/></label>
                ) : (
                    <button className="__upload" onClick={handleUpdatePhoto}>{loading ? <span className="__load"></span> : <IconCheck/>}</button>
                )}
            </div>
        </>

    )

}