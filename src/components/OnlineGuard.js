import { useUI } from "../context/UIContext";
import Offline from "../layout/Offline";

export default function OnlineGuard ({ children }) {

    const { online } = useUI();

    if (!online) return <Offline/>

    return children;

}