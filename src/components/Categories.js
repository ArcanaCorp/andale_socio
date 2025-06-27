import { useProduct } from "../context/ProductContext"
import { useUI } from "../context/UIContext";

import './styles/categories.css'

export default function Categories () {

    const { tab, changeTab } = useUI();
    const { categories } = useProduct();

    console.log(categories);

    return (

        <div className="__categories">
            <div className={`__categories__badge ${tab === 'all' ? '__categories__badge--active' : ''}`} onClick={() => changeTab('all')}>Todo</div>
            {categories.map((c) => (
                <div key={c.id} className={`__categories__badge ${tab === c.category ? '__categories__badge--active' : ''}`} onClick={() => changeTab(c.category)}>{c.category}</div>
            ))}
        </div>

    )

}