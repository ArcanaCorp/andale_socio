import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { IconCamera, IconChevronLeft, IconFileText, IconHelp, IconPencil, IconInfoCircle } from "@tabler/icons-react";

import { useAuth } from "../../context/AuthContext";

import './styles/profile.css'

export default function Profile () {

    const navigate = useNavigate();
    const { user, contextLogoutAccount } = useAuth();

    const handleLogout = async () => {
        try {
            
            const data = await contextLogoutAccount()
            if (!data.ok) return toast.warning('Alerta', { description: data.message })
                toast.success('Éxito', { description: data.message })
                navigate('/')
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        }
    }

    return (

        <div className="__bg_profile">

            <header className="__header_profile">
                <button className="__btn_back" onClick={() => navigate('/panel')}><IconChevronLeft size={24} stroke={'#888888'} strokeWidth={1.2} /></button>
            </header>

            <main className="__main_profile">
        
                <div className="__section_photo">

                    <div className="__photo" style={{backgroundImage: `url(${user?.photo})`}}>
                        <img src={`${user?.photo}`} alt={`Foto de ${user?.name} | ${user?.text} | Ándale Socio`} style={{display: 'none'}} loading="lazy" />
                        <input type="file" style={{display: 'none'}} id="upload" accept="image/png, image/jpg, image/jpeg" />
                        <label className="__upload" htmlFor="upload"><IconCamera/></label>
                    </div>

                </div>

                <section className="__section_group">

                    <h3>Edita tu información</h3>
                    
                    <div>
                        <div>
                            <input placeholder="Ingresa tu nuevo nombre" />
                            <button><IconPencil/></button>
                        </div>

                        <div>
                            <input placeholder="Ingresa tu nuevo nombre" />
                            <button><IconPencil/></button>
                        </div>
                    </div>

                </section>

                <section className="__section_group">

                    <h3>Acerca</h3>

                    <ul>
                        <li>
                            <Link to={'https://wa.me/51966327426?text=Necesito'} target="_blank">
                                <span className="__ico"><IconHelp/></span>
                                <span>Centro de ayuda</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/terms'} target="_blank">
                                <span className="__ico"><IconFileText/></span>
                                <span>Términos y Condiciones</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} target="_blank">
                                <span className="__ico"><IconInfoCircle/></span>
                                <span>Información de la aplicación</span>
                            </Link>
                        </li>
                    </ul>

                </section>

                <button className={`__btn_logout __btn_outline_primary`} onClick={handleLogout}>Cerrar sesión</button>
            
            </main>

        </div>

    )

}