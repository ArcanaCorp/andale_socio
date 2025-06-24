import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loading from "../../layout/Loading";
import { servicePartnerId } from "../../services/partner.service";
import { Helmet } from "react-helmet";

export default function CompanyView () {

    const { sub } = useParams();
    const [ info, setInfo ] = useState(null)
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getInfo = async () => {
            if (info === null) {
                const data = await servicePartnerId(sub)
                if (!data.ok) return;
                    setInfo(data.bussines)
                    setLoading(false)
            }
        }
        getInfo();
    }, [])

    if (loading) return <Loading/>

    return (
    
        <>

            <Helmet>
                <meta name="description" content={`${info?.text} | Ándale Socio`} />
                <title>{info?.name} | Ándale</title>
            </Helmet>
        
            <h1>{info?.name}</h1>

        </>

    )

}