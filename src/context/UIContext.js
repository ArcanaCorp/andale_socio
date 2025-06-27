import { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {

    const [ online, setOnline ] = useState(navigator.onLine);

    const [ tab, setTab ] = useState('all')

    const changeTab = (t) => setTab(t)

    useEffect(() => {
        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const contextValue = {
        online,
        tab,
        changeTab
    }

    return (
        <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
    )

}

export const useUI = () => useContext(UIContext);