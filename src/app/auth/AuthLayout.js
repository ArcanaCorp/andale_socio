import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../statics/img/logo-white.svg'
import { Toaster } from 'sonner';
import Cookies from 'js-cookie';
import './styles/layout.css'
import './styles/form.css'
import { useEffect } from 'react';

export default function AuthLayout () {

    const navigate = useNavigate();
    const location = useLocation();

    const routesInfo = {
        '/login': {
            title: 'Ingresa tu número',
            description: 'Accede ingresando tu número de teléfono que usas para tu negocio.'
        },
        '/login/verify': {
            title: 'Verifica tu número',
            description: 'Hemos enviado un código de 6 dígitos para validar tu número.'
        },
        '/login/completed': {
            title: 'Completa tu info',
            description: 'Completa tu información para llegar a tus clientes.'
        },
        '/login/completed/photo': {
            title: 'Sube tu foto',
            description: 'Sube una foto para que tus clientes te puedan reconocer facilmente.'
        }
    };

    // Devuelve el objeto correspondiente o valores por defecto
    const { title, description } = routesInfo[location.pathname] || {title: '', description: ''};

    useEffect(() => {
        const token = Cookies.get('andale_socio')
        if (token) {
            navigate('/mybuss')
        }
    }, [navigate])

    return (

        <>

            <div className="__auth_layout">

                <div className='__logo'>
                    <img src={logo} className='__img_logo' alt='Logo de Ándale Socio' loading='lazy'/>
                </div>

                <div className='__card'>
                    
                    <div className={`__card_tit`}>
                        <h1 className='__h1_tit'>{title}</h1>
                        <p className='__p_sub'>{description}</p>
                    </div>

                    <div className='__card_form'>
                        <Outlet/>
                    </div>

                    <div className='__card_small_info'>
                        <p>Al continuar estás aceptando nuestros <a href='/' className='__link_txt'>Términos y Condiciones</a>, <a href='/' className='__link_txt'>Política de uso de datos</a> y <a href='/' className='__link_txt'>Publicidad</a></p>
                    </div>

                </div>

            </div>

            <Toaster position='top-center' richColors />
        
        </>

    )

}