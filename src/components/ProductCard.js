import { useNavigate } from 'react-router-dom'
import { URL_API } from '../config'
import './styles/product-card.css'
export default function ProductCard ({ sub, product }) {

    const navigate = useNavigate();

    const image = product?.images.find((i) => i.is_main === true)

    return (

        <div className="__card_product" onClick={() => navigate(`/edit/${product?.id}`)}>

            <div className="__card_product_image" style={{backgroundImage: `url(${URL_API}/product/photo/${sub}/${image.filename}})`}}>
                <img src={`${URL_API}/product/photo/${sub}/${image.filename}`} style={{display: 'nonde'}} alt={product?.text} loading='lazy' />
            </div>
            <div className="__card_product_info">
                <h4>{product?.name}</h4>
                <p>s/.{product?.price}</p>
            </div>

        </div>

    )

}