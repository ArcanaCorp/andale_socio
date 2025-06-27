import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useProduct } from '../../context/ProductContext';
import './styles/products.css'
import { toast } from 'sonner';
import Categories from '../../components/Categories';

export default function Products () {

    const { products, contextListProducts, categories, contextListCategories } = useProduct();
    const [ loading, setLoading ] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);

            if (products.length === 0) {
                await contextListCategories();
                await contextListProducts();
            }
        } catch (error) {
            toast.error('Error', { description: error.message });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (

        <>

            {loading ? (

                <div className='__message_products'>
                    <span className='__loader'></span>
                </div>
            
            ) : (

                <>

                    {categories.length > 0 && ( <Categories/> )}
                    
                    {products.length === 0 ? (

                        <div className='__message_products'>
                            <div className='__box_message_products'>
                                <h3>No hay productos disponibles</h3>
                                <button onClick={getData}>Volver a intentar</button>
                            </div>
                        </div>

                    ) : (

                        <div className="__grid_products">
                                
                            {products.map((p) => ( <ProductCard key={p.id} product={p} /> ))}
                            
                        </div>

                    )}

                </>
            )}

        </>

    )

}