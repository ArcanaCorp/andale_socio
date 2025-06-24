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
import New from './app/dashboard/New';
import Products from './app/dashboard/Products';
import EditProduct from './app/views/EditProduct';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout/>,
        children: [
            {
                path: '/',
                element: <Login/>
            },
            {
                path: '/verify',
                element: <Verify/>
            },
            {
                path: '/completed',
                element: <Complete/>
            },
            {
                path: '/completed/photo',
                element: <Photo/>
            }
        ]
    },
    {
        path: '/panel',
        element: <DashboardLayout/>,
        children: [
            {
                path: '/panel',
                element: <Products/>
            }
        ]
    },
    {
        path: '/new',
        element: <New/>
    },
    {
        path: '/edit/:productId',
        element: <EditProduct/>
    }
])

const root = createRoot(document.getElementById('root'))

root.render(
    <>
    
        <AuthProvider>
        
            <RouterProvider router={router} />
        
        </AuthProvider>

    </>
)