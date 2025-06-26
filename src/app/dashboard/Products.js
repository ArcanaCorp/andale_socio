import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useProduct } from '../../context/ProductContext';
import './styles/products.css'
import { toast } from 'sonner';

export default function Products () {

    const { products, contextListProducts } = useProduct();
    const [ loading, setLoading ] = useState(false);

    const getProducts = async () => {

        try {
            
            setLoading(true)

            if (products.length === 0) {
                await contextListProducts()
            }

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (

        <>

            {loading ? (

                <div className='__message_products'>
                    <span className='__loader'></span>
                </div>
            
            ) : (

                products.length === 0 ? (

                    <div className='__message_products'>
                        <div className='__box_message_products'>
                            <h3>No hay productos disponibles</h3>
                            <button onClick={getProducts}>Volver a intentar</button>
                        </div>
                    </div>

                ) : (

                    <div className="__grid_products">
                        
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    
                    </div>

                )
            )}

        </>

    )

}