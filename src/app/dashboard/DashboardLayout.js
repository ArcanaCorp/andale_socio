import { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../layout/Loading";
import HeaderApp from "../../layout/HeaderApp";
import { Toaster } from "sonner";

import './styles/layout.css'
import Tabs from "../../layout/Tabs";

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
        
                <HeaderApp/>

                <div className="__main_dashboard">
                    <Outlet/>
                </div>

                <Tabs/>
            
            </div>

            <Toaster position="top-center" richColors />

        </>

    )

}