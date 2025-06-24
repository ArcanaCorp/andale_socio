import { IconListDetails, IconSmartHome, IconUserCircle } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

export default function Tabs () {

    const location = useLocation();

    return (
        <nav className="__tabs">
            <ul className="__tabs_items">
                <li className={`__tab ${location.pathname === '/panel' && '__tab_active'}`}>
                    <Link to={'/panel'} viewTransition><IconSmartHome size={24} strokeWidth={1.2}/></Link>
                </li>
                <li className={`__tab ${location.pathname === '/panel/products' && '__tab_active'}`}>
                    <Link to={'/panel/products'} viewTransition><IconListDetails size={24} strokeWidth={1.2}/></Link>
                </li>
                <li className={`__tab ${location.pathname === '/panel/profile' && '__tab_active'}`}>
                    <Link to={'/panel/profile'} viewTransition><IconUserCircle size={24} strokeWidth={1.2}/></Link>
                </li>
            </ul>
        </nav>
    )

}