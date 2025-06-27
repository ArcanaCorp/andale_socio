import { IconArrowLeft, IconCheck, IconPencil, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Loading from "../../layout/Loading";
import { toast, Toaster } from "sonner";
import { serviceDeleteProduct, serviceProductId, serviceUpdateProduct } from "../../services/product.service";
import { useProduct } from "../../context/ProductContext";
import ModalDelete from "../../components/ModalDelete";

export default function EditProduct () {

    const navigate = useNavigate();
    const { productId } = useParams();
    const { contextDeleteProduct, contextUpdateProduct } = useProduct();

    const [ modal, setModal ] = useState(false)
    const [ product, setProduct ] = useState()
    const [ newName, setNewName ] = useState('')
    const [ newText, setNewText ] = useState('')
    const [ newAmount, setNewAmount ] = useState('')
    const [ newPrice, setNewPrice ] = useState('')
    const [ loading, setLoading ] = useState(true)

    const [editingField, setEditingField] = useState(null);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setNewAmount(value);
        }
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setNewPrice(value);
        }
    };

    const handleViewModal = () => setModal(!modal)

    const handleDelete = async () => {
        try {
            
            const data = await serviceDeleteProduct(productId)
            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                contextDeleteProduct(productId)
                navigate('/')

        } catch (error) {
            toast.error('Error', { description: error.message })
        }
    }

    const handleUpdateInfo = async () => {
        try {
            
            const payload = {
                ...(newName.trim() && { name: newName }),
                ...(newText.trim() && { text: newText }),
                ...(newAmount.trim() && { amount: newAmount } ),
                ...(newPrice.trim() && { price: newPrice })
            };
            
            // Si no hay datos válidos, no enviamos nada
            if (Object.keys(payload).length === 0) {
                toast.warning('Alerta', { description: "No hay datos válidos para actualizar." })
                setEditingField(null);
                return;
            }
            
            const data = await serviceUpdateProduct(productId, payload)
            
            if (!data.ok) return toast.warning('Alerta', { description: data.message })
            
                toast.success('Éxito', { description: data.message })
                contextUpdateProduct(data?.product)

        } catch (error) {
            toast.error('Error', { description: error.message })
        }
    }

    const handleEditClick = (field) => {
        if (editingField === field) {
            handleUpdateInfo()
            setEditingField(null)
        } else {
            setEditingField(field)
        }
    }

    useEffect(() => {
        const getInfo = async () => {
            if (productId) {
                const info = await serviceProductId(productId)
                if (!info.ok) return;
                setProduct(info?.product)
                setLoading(false)
            }
        }
        getInfo();
    }, [productId])

    if (loading) return <Loading/>;

    return (

        <>
        
            <header className="__header_new">
                <div className="__col">
                    <button className="__btn_back" onClick={() => navigate('/panel')}><IconArrowLeft size={18} /></button>
                    <h3>Editar producto</h3>
                </div>
                <button className="__btn_delete __btn_outline_primary" onClick={handleViewModal}><IconTrash/></button>
            </header>

            <main className="__main_new">
            
                <div className="__form">

                    <div></div>

                    <div className="__form_group">

                        <label htmlFor="edit-name" className="__label">Editar nombre del producto</label>

                        <div className="__form_control">
                            <input type="text" className="__form_entry" id="edit-name" disabled={editingField !== 'name'} value={newName} placeholder={`${product?.name}`} onChange={(e) => setNewName(e.target.value)} />
                            <button className="__btn_edit" onClick={() => handleEditClick('name')}>{editingField === 'name' ? <IconCheck/> : <IconPencil/>}</button>
                        </div>

                    </div>

                    <div className="__form_group __form_group_box">

                        <label htmlFor="edit-text" className="__label">Editar descripción del producto</label>

                        <div className="__form_control __form_control--edit">
                            <textarea type="text" className="__form_entry_box" id="edit-text"  disabled={editingField !== 'text'}value={newText} placeholder={`${product?.text}`} onChange={(e) => setNewText(e.target.value)} />
                            <button className="__btn_edit" onClick={() => handleEditClick('text')}>{editingField === 'text' ? <IconCheck/> : <IconPencil/>}</button>
                        </div>

                    </div>

                    <div className="__form_group">

                        <label htmlFor="edit-amount" className="__label">Editar cantidad del producto</label>

                        <div className="__form_control">
                            <input type="tel" inputMode="numeric" pattern="[0-9]*" disabled={editingField !== 'amount'} className="__form_entry" id="edit-amount" value={newAmount} placeholder={`${product?.amount}`} onChange={handleAmountChange} />
                            <button className="__btn_edit" onClick={() => handleEditClick('amount')}>{editingField === 'amount' ? <IconCheck/> : <IconPencil/>}</button>
                        </div>

                    </div>

                    <div className="__form_group">

                        <label htmlFor="edit-price" className="__label">Editar precio del producto</label>

                        <div className="__form_control">
                            <input type="tel" inputMode="numeric"  className="__form_entry" disabled={editingField !== 'price'} id="edit-price" value={newPrice} placeholder={`${product?.price}`} onChange={handlePriceChange} />
                            <button className="__btn_edit" onClick={() => handleEditClick('price')}>{editingField === 'price' ? <IconCheck/> : <IconPencil/>}</button>
                        </div>

                    </div>

                </div>
            
            </main>

            <ModalDelete modal={modal} handleDelete={handleDelete} handleViewModal={handleViewModal} />

            <Toaster position="top-center" richColors />

        </>

    )

}