import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../layout/Loading";
import Header from "../../layout/Header";
import { Toaster } from "sonner";
import { IconPlus, IconX, IconCategory2, IconBuildingStore } from "@tabler/icons-react";

import './styles/layout.css'

export default function DashboardLayout () {

    const navigate = useNavigate()
    const { authReady } = useAuth()
    const [ activeFloat, setActiveFloat ] = useState(false)

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

                <main className="__main_dashboard">
                    <Link to={'/category/new'} className={`__btn_float ${activeFloat ? '__btn_float_cgt' : ''}`}><IconCategory2 size={24} stroke={'#FFFFFF'} strokeWidth={1.2}/></Link>
                    <Link to={'/new'} className={`__btn_float ${activeFloat ? '__btn_float_new' : ''}`}><IconBuildingStore size={24} stroke={'#FFFFFF'} strokeWidth={1.2}/></Link>
                    <button className="__btn_float" onClick={() => setActiveFloat(!activeFloat)}>
                        {activeFloat ? <IconX size={24} stroke={'#FFFFFF'} strokeWidth={1.2}/> : <IconPlus size={24} stroke={'#FFFFFF'} strokeWidth={1.2}/>}
                    </button>
                    <Outlet/>
                </main>
            
            </div>

            <Toaster position="top-center" richColors />

        </>

    )

}