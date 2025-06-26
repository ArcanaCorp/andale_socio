import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft, IconPhoto } from "@tabler/icons-react";

import './styles/new.css'
import { toast, Toaster } from "sonner";
import { serviceAddProduct } from "../../services/product.service";
import { useProduct } from "../../context/ProductContext";

export default function New () {

    const navigate = useNavigate();
    const { contextSavedProduct } = useProduct();
    const [ images, setImages ] = useState([])
    const [ imagesURI, setImagesURI ] = useState([])
    const [ nameP, setNameP ] = useState('')
    const [ textP, setTextP ] = useState('')
    const [ amountP, setAmountP ] = useState('')
    const [ priceP, setPriceP ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const selectedFiles = files.slice(0, 5); // máximo 5 archivos

        setImages(selectedFiles);

        const fileReaders = selectedFiles.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders)
            .then(setImagesURI)
            .catch(err => console.error("Error al cargar imágenes:", err));
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setAmountP(value);
        }
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setPriceP(value);
        }
    };

    const handleCreated = async () => {
        try {
            setLoading(true)
            
            const formData = new FormData();
            images.forEach((image) => {
                formData.append('images', image);
            });
            formData.append('name', nameP)
            formData.append('text', textP)
            formData.append('amount', amountP)
            formData.append('price', priceP)

            const data = await serviceAddProduct(formData)

            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                contextSavedProduct(data.product)
                navigate('/panel')

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (

        <>
        
            <header className="__header_new">
                <button className="__btn_back" onClick={() => navigate('/panel')}><IconArrowLeft size={18} /></button>
                <h3>Crea un nuevo producto</h3>
            </header>

            <main className="__main_new">

                <div className="__form">

                    <div className="__form_group __form_group_images">
                        {imagesURI.length < 5 && (
                            <label className="__label_image" htmlFor="images"><IconPhoto size={24} stroke={'#888888'} strokeWidth={1.2} /></label>
                        )}
                        <input type="file" id="images" style={{display: 'none'}} accept="image/png, image/jpg, image/jpeg" multiple onChange={handleImageChange}/>
                        {imagesURI.map((image, index) => (
                            <div key={index} className="__preview">
                                <img src={image} alt={`Imagen de previsto ${index}`} loading="lazy" className="__image_preview" />
                            </div>
                        ))}
                    </div>

                    <div className="__form_group">
                        <label className="__label" htmlFor="name_create">Ingresa el nombre de tu producto</label>
                        <div className="__form_control">
                            <input type="text" value={nameP} className="__form_entry" id="name_create" placeholder="Ingresa el nombre de tu producto" onChange={(e) => setNameP(e.target.value)} />
                        </div>
                    </div>

                    <div className="__form_group __form_group_box">
                        <label className="__label" htmlFor="text_create">Ingresa la descripción de tu producto</label>
                        <div className="__form_control">
                            <textarea value={textP} className="__form_entry_box" id="text_create" placeholder="Ingresa la descripción de tu producto" onChange={(e) => setTextP(e.target.value)} />
                        </div>
                    </div>

                    <div className="__form_group">
                        <label className="__label" htmlFor="amount_create">Ingresa la cantidad del producto</label>
                        <div className="__form_control">
                            <input type="tel" value={amountP} inputMode="numeric" pattern="[0-9]*" className="__form_entry" id="amount_create" placeholder="Ingresa la cantidad del producto" onChange={handleAmountChange} />
                        </div>
                    </div>

                    <div className="__form_group">
                        <label className="__label" htmlFor="price_create">Ingresa el precio de tu producto</label>
                        <div className="__form_control">
                            <input type="tel" value={priceP} inputMode="numeric" pattern="[0-9]*" className="__form_entry" id="price_create" placeholder="Ingresa el precio de tu producto" onChange={handlePriceChange} />
                        </div>
                    </div>

                    <div className="__form_group">
                        <button className="__btn __btn_primary" onClick={handleCreated}>
                            {loading ? <span className="__loader"></span> : 'Crear'}
                        </button>
                    </div>

                </div>

            </main>

            <Toaster position="top-center" richColors/>

        </>

    )

}