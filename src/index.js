import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from './app/auth/AuthLayout';
import DashboardLayout from './app/dashboard/DashboardLayout';

import './statics/css/global.css'
import Login from './app/auth/Login';
import { AuthProvider } from './context/AuthContext';
import Verify from './app/auth/Verify';
import Complete from './app/auth/Complete';
import Photo from './app/auth/Photo';

const router = createBrowserRouter([
    {
        path: '/',
    },
    {
        path: '/login',
        element: <AuthLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/login/verify',
                element: <Verify/>
            },
            {
                path: '/login/completed',
                element: <Complete/>
            },
            {
                path: '/login/completed/photo',
                element: <Photo/>
            }
        ]
    },
    {
        path: '/panel',
        element: <DashboardLayout/>,
        children: [
            {
                path: '/panel'
            },
            {
                path: '/panel/products'
            },
            {
                path: '/panel/profile'
            }
        ]
    },
])

const root = createRoot(document.getElementById('root'))

root.render(
    <>
    
        <AuthProvider>
        
            <RouterProvider router={router} />
        
        </AuthProvider>

    </>
)