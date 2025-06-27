import { createContext, useContext, useState } from "react";
import { serviceListProduct } from "../services/product.service";
import { serviceListCategories } from "../services/category.service";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [ products, setProducts ] = useState([]);
    const [ categories, setCategories ] = useState([])

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
        try {
            console.log(updatedProduct);
            // Actualizar el contexto
            setProducts(prev =>
                prev.map(prod => prod.id === updatedProduct.id ? updatedProduct : prod)
            );

            // Actualizar el localStorage con el producto actualizado
            const localProducts = JSON.parse(localStorage.getItem('products')) || [];
            const updatedProducts = localProducts.map(prod => 
                String(prod.id) === String(updatedProduct.id) ? updatedProduct : prod
            );
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        } catch (error) {
            console.error('Error al actualizar en el contexto/localStorage:', error);
        }
    };

    const contextListCategories = async () => {
        try {

            const localCategories = localStorage.getItem('categories');

            if (localCategories) {
                const parsedCategories = JSON.parse(localCategories);

                // Verificar que sea un array y que no esté vacío
                if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
                    setCategories(parsedCategories);
                    return { ok: true };
                }
            }

            // Si no hay productos válidos en localStorage, consulta el servicio
            const data = await serviceListCategories();

            if (data.ok) {
                if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
                    setCategories(data.categories);
                    localStorage.setItem('categories', JSON.stringify(data.categories));
                } else {
                    setCategories([]);
                    localStorage.removeItem('categories');  // limpiar localStorage si no hay productos válidos
                }
                return { ok: true };
            }

        } catch (error) {
            console.error('Error al listar productos:', error);
            return { ok: false };
        }
    }

    const contextValue = {
        products,
        contextListProducts,
        contextSavedProduct,
        contextDeleteProduct,
        contextUpdateProduct,
        categories,
        contextListCategories
    }

    return (
        <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>
    )

}

export const useProduct = () => useContext(ProductContext)