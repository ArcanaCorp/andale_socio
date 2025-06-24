import { useEffect } from "react";
import Cookies from "js-cookie";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../layout/Loading";
import Header from "../../layout/Header";
import { Toaster } from "sonner";

import './styles/layout.css'
import { IconPencil } from "@tabler/icons-react";

export default function DashboardLayout () {

    const navigate = useNavigate()
    const { authReady } = useAuth()

    useEffect(() => {
        const token = Cookies.get('andale_socio')
        if (!token) {
            navigate('/login')
        }
    }, [navigate])

    if (!authReady) return <Loading/>

    return (

        <>

            <div className="__dashboard_layout">
        
                <Header/>

                <div className="__main_dashboard">
                    <Link to={'/new'} className="__btn_float"><IconPencil size={24} stroke={'#FFFFFF'} strokeWidth={1.2}/></Link>
                    <Outlet/>
                </div>
            
            </div>

            <Toaster position="top-center" richColors />

        </>

    )

}