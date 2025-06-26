import { createContext, useContext, useState } from "react";
import { serviceListProduct } from "../services/product.service";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [ products, setProducts ] = useState([]);

    const contextListProducts = async () => {
        try {
            const localProducts = localStorage.getItem('products');

            if (localProducts) {
                const parsedProducts = JSON.parse(localProducts);

                // Verificar que sea un array y que no esté vacío
                if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
                    setProducts(parsedProducts);
                    return { ok: true };
                }
            }

            // Si no hay productos válidos en localStorage, consulta el servicio
            const data = await serviceListProduct();

            if (data.ok) {
                if (data.products && Array.isArray(data.products) && data.products.length > 0) {
                    setProducts(data.products);
                    localStorage.setItem('products', JSON.stringify(data.products));
                } else {
                    setProducts([]);
                    localStorage.removeItem('products');  // limpiar localStorage si no hay productos válidos
                }
                return { ok: true };
            }

        } catch (error) {
            console.error('Error al listar productos:', error);
            return { ok: false };
        }
    };

    const contextSavedProduct = (p) => {
        setProducts(prev => {
            const exists = prev.some(prod => prod.id === p.id);
            return exists ? prev : [...prev, p];
        });
    };

    const contextDeleteProduct = (id) => {
        try {
            // Asegurar que ambos ids sean del mismo tipo (string)
            const localProducts = JSON.parse(localStorage.getItem('products')) || [];
            const updatedProducts = localProducts.filter(prod => String(prod.id) !== String(id));
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            // Actualizar contexto
            setProducts(prev => prev.filter(prod => String(prod.id) !== String(id)));
        } catch (error) {
            console.error('Error al eliminar del contexto/localStorage:', error);
        }
    };

    const contextUpdateProduct = (updatedProduct) => {
        setProducts(prev =>
            prev.map(prod => prod.id === updatedProduct.id ? updatedProduct : prod)
        );
    };

    const contextValue = {
        products,
        contextListProducts,
        contextSavedProduct,
        contextDeleteProduct,
        contextUpdateProduct
    }

    return (
        <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>
    )

}

export const useProduct = () => useContext(ProductContext)