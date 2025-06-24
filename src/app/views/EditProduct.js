import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "../../layout/Loading";
import { Toaster } from "sonner";

export default function EditProduct () {

    const navigate = useNavigate();
    const { productId } = useParams();

    const { user } = useAuth();

    const [ product, setProduct ] = useState()
    const [ newName, setNewName ] = useState('')
    const [ newText, setNewText ] = useState('')
    const [ newAmount, setNewAmount ] = useState('')
    const [ newPrice, setNewPrice ] = useState('')
    const [ loading, setLoading ] = useState(true)

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

    useEffect(() => {
        const getInfo = async () => {
            if (user && productId) {
                const products = user?.products;
                const info = products.find((p) => p.id === Number(productId))
                setProduct(info)
                setLoading(false)
            }
        }
        getInfo();
    }, [user, productId])

    if (loading) return <Loading/>;

    return (

        <>
        
            <header className="__header_new">
                <button className="__btn_back" onClick={() => navigate('/panel')}><IconArrowLeft size={18} /></button>
                <h3>Editar producto</h3>
            </header>

            <main className="__main_new">
            
                <div className="__form">

                    <div></div>

                    <div className="__form_group">

                        <label htmlFor="edit-name" className="__label">Editar nombre del producto</label>

                        <div className="__form_control">
                            <input type="text" className="__form_entry" id="edit-name" value={newName} placeholder={`${product?.name}`} onChange={(e) => setNewName(e.target.value)} />
                        </div>

                    </div>

                    <div className="__form_group __form_group_box">

                        <label htmlFor="edit-text" className="__label">Editar descripción del producto</label>

                        <div className="__form_control">
                            <textarea type="text" className="__form_entry_box" id="edit-text" value={newText} placeholder={`${product?.text}`} onChange={(e) => setNewText(e.target.value)} />
                        </div>

                    </div>

                    <div className="__form_group">

                        <label htmlFor="edit-amount" className="__label">Editar cantidad del producto</label>

                        <div className="__form_control">
                            <input type="tel" inputMode="numeric" pattern="[0-9]*" className="__form_entry" id="edit-amount" value={newAmount} placeholder={`${product?.amount}`} onChange={handleAmountChange} />
                        </div>

                    </div>

                    <div className="__form_group">

                        <label htmlFor="edit-price" className="__label">Editar precio del producto</label>

                        <div className="__form_control">
                            <input type="tel" inputMode="numeric"  className="__form_entry" id="edit-price" value={newPrice} placeholder={`${product?.price}`} onChange={handlePriceChange} />
                        </div>

                    </div>

                    <div className="__form_group">
                        <button className={`__btn __btn_primary`}>Editar</button>
                    </div>

                </div>
            
            </main>

            <Toaster position="top-center" richColors />

        </>

    )

}