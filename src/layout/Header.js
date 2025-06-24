import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import './styles/header.css'
import { URL_API } from '../config';
export default function Header () {

    const { user } = useAuth();

    return (

        <header className="__header">

            <div>
                <p>Buen día,</p>
                <h1>{user?.name}</h1>
            </div>

            <Link to={`/profile`} className='__link_avatar'>
                <img src={`${URL_API}/account/photo/${user?.sub}/${user?.photo}`} alt={`Foto de perfil`} loading='lazy' />
            </Link>

        </header>

    )

}