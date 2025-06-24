import { useAuth } from '../context/AuthContext'
import './styles/headerapp.css'
export default function HeaderApp () {

    const { user } = useAuth();

    return (

        <header className="__header_app">

            <div>
                <p>Buen día,</p>
                <h1>{user?.name}</h1>
            </div>

        </header>

    )

}