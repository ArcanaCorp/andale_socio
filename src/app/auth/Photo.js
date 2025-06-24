import { IconCamera } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { serviceUploadPhoto } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Photo () {

    const navigate = useNavigate()
    const [ photo, setPhoto ] = useState();
    const [ photoURI, setPhotoURI ] = useState('')

    const [ loading, setLoading ] = useState(false)

    const changePhoto = (e) => {
        const file = e.target.files[0];

        if (!file) return toast.warning('Alerta', { description: 'No se pudo cargar la imagen' });

        // Validar tipo
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) return toast.warning('Alerta', { description: 'Formato no válido. Solo se permiten JPG y PNG.' })

        setPhoto(file);

        // Crear URL temporal para mostrar preview
        const previewURL = URL.createObjectURL(file);
        setPhotoURI(previewURL);
    }

    const handleUploadPhoto = async () => {

        if (!photo) return toast.warning('Alerta', { description: 'Escoge una imagen antes de subirla' })

        try {
            
            setLoading(true)
            const data = await serviceUploadPhoto(photo)

            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                navigate('/mybuss')

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }

    }

    return (

        <>
        
            <div className="__form_group">
                <label className="__label_upload" htmlFor="photo" style={{backgroundImage: `url(${photoURI})`}}>
                    {photoURI === '' && <IconCamera size={24}/>}
                </label>
                <input type="file" id="photo" style={{display: 'none'}} accept="image/png, image/jpg, image/jpeg" onChange={changePhoto} />
            </div>

            <div className="__form_group">
                <button className={`__btn __btn_primary`} onClick={handleUploadPhoto}>
                    {loading ? <span className="__loader"></span> : 'Subir foto'}
                </button>
            </div>

        </>

    )

}