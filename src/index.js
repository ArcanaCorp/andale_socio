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
import { ProductProvider } from './context/ProductContext';
import Error from './layout/Error';
import Profile from './app/dashboard/Profile';
import Terms from './layout/Terms';
import NewCategory from './app/dashboard/NewCategory';
import { UIProvider } from './context/UIContext';
import OnlineGuard from './components/OnlineGuard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <OnlineGuard><AuthLayout/></OnlineGuard>,
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
        ],
        errorElement: <Error/>
    },
    {
        path: '/panel',
        element: <OnlineGuard><DashboardLayout/></OnlineGuard>,
        children: [
            {
                path: '/panel',
                element: <Products/>
            }
        ],
        errorElement: <Error/>
    },
    {
        path: '/new',
        element: <New/>,
        errorElement: <Error/>
    },
    {
        path: '/category/:action',
        element: <NewCategory/>,
        errorElement: <Error/>
    },
    {
        path: '/edit/:productId',
        element: <EditProduct/>,
        errorElement: <Error/>
    },
    {
        path: '/profile',
        element: <Profile/>,
        errorElement: <Error/>
    },
    {
        path: '/terms',
        element: <Terms/>,
        errorElement: <Error/>
    }
])

const root = createRoot(document.getElementById('root'))

root.render(
    <>

        <UIProvider>
        
            <AuthProvider>

                <ProductProvider>
            
                    <RouterProvider router={router} />
                
                </ProductProvider>
            
            </AuthProvider>
            
        </UIProvider>

    </>
)