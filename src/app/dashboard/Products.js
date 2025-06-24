import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../context/AuthContext'
import './styles/products.css'

export default function Products () {

    const { user } = useAuth();

    return (

        <>
        
            <div className="__grid_products">

                {user?.products.length === 0 ? (

                    <div></div>

                ) : (

                    user?.products.map((p) => (
                        <ProductCard key={p.id} sub={user?.sub} product={p} />
                    ))

                )}

            </div>

        </>

    )

}