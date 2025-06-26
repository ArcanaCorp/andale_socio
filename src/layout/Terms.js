import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";

import './styles/terms.css'

export default function Terms () {

    const navigate = useNavigate();

    return (

        <>

            <Helmet>
                <title>Términos y Condiciones | Ándale Socio</title>
            </Helmet>

            <div className="__terms">

                <header className="__terms_head">
                    <button className="__btn_back" onClick={() => navigate('/panel')}><IconChevronLeft/></button>
                </header>

                <main className="__terms_main">
                    
                    <article className="__article">

                        <h2 className="__article_tit">📄 Política de Privacidad</h2>
                        <p className="__article_updated">Última actualización: <time>26 de junio de 2025</time></p>

                        <p className="__article_parragraph">
                            Esta Política de Privacidad describe cómo ARCANA CORP S.A.C., con RUC 20612123901,
                            en adelante “Ándale Socio”, recolecta, usa, protege y trata los datos personales de 
                            los usuarios de nuestro sitio web y aplicación móvil.
                        </p>

                        <ul className="__article_list">
                            
                            <li>
                                <h3>1. Responsable del tratamiento de datos</h3>
                                <ul className="__article_sub_list">
                                    <li>Razón Social: ARCANA CORP S.A.C.</li>
                                    <li>RUC: 20612123901</li>
                                    <li>Marca comercial: Ándale Socio</li>
                                    <li>Correo de contacto: arcanacorp12@gmail.com</li>
                                    <li>Dirección: Prolongación Tarapaca int. 409 - Yauyos - Jauja</li>
                                </ul>
                            </li>

                            <li>
                                <h3>2. Datos personales que recolectamos</h3>
                                <p className="__article_parragraph">Reunimos la siguiente información, dependiendo del uso del servicio:</p>
                                <ul className="__article_sub_list">
                                    <li>Nombre completo</li>
                                    <li>Número de teléfono</li>
                                    <li>Datos de productos publicados</li>
                                    <li>Historial de navegación y uso de la app</li>
                                    <li>Ubicación (si se habilita)</li>
                                    <li>Información sobre compras por WhatsApp</li>
                                    <li>Actividad dentro de la app (clics, interacciones, búsquedas)</li>
                                </ul>
                            </li>

                            <li>
                                <h3>3. Finalidades del tratamiento</h3>
                                <p className="__article_parragraph">Tus datos personales serán utilizados para:</p>
                                <ul className="__article_sub_list">
                                    <li>Gestionar tu cuenta en Ándale Socio</li>
                                    <li>Permitir la publicación y visualización de productos</li>
                                    <li>Coordinar pedidos por WhatsApp</li>
                                    <li>Enviar notificaciones de interés (productos, estado de pedidos, promociones)</li>
                                    <li>Realizar análisis internos para mejorar el servicio</li>
                                    <li>Usar con fines estadísticos y de desarrollo comercial</li>
                                </ul>
                            </li>

                            <li>
                                <h3>4. Seguridad y almacenamiento</h3>
                                <p className="__article_parragraph">
                                    La información se almacena en servidores seguros. Implementamos medidas técnicas 
                                    y organizativas para garantizar la confidencialidad, integridad y disponibilidad de tus datos.
                                </p>
                                <p className="__article_parragraph">
                                    La información se almacena en servidores seguros. Implementamos medidas técnicas 
                                    y organizativas para garantizar la confidencialidad, integridad y disponibilidad de tus datos.
                                </p>
                            </li>

                            <li>
                                <h3>5. Compartición de datos</h3>
                                <p className="__article_parragraph">No compartimos tus datos con terceros sin tu consentimiento, salvo:</p>
                                <ul className="__article_sub_list">
                                    <li>Servicios logísticos o de mensajería si fuese necesario para completar un pedido</li>
                                    <li>Proveedores de tecnología o analítica (como Google o servicios de hosting)</li>
                                    <li>Autoridades públicas cuando sea requerido legalmente</li>
                                </ul>
                            </li>

                            <li>
                                <h3>6. Derechos del titular</h3>
                                <p className="__article_parragraph">
                                    Puedes ejercer tus derechos de acceso, rectificación, cancelación u oposición (ARCO) 
                                    conforme a la Ley 29733 enviando un correo a: 📧 arcanacorp12@gmail.com
                                </p>
                            </li>

                            <li>
                                <h3>7. Cambios a esta política</h3>
                                <p className="__article_parragraph">Nos reservamos el derecho de actualizar esta política. Notificaremos cambios importantes a través de la app o el sitio web.</p>
                            </li>

                        </ul>
                    
                    </article>

                    <div className="__line"></div>

                    <article className="__article">

                        <h2 className="__article_tit">📜 Términos y Condiciones de Uso</h2>
                        <p className="__article_updated">Última actualización: <time>26 de junio de 2025</time></p>
                        <p className="__article_parragraph">
                            Los presentes Términos y Condiciones regulan el uso de la aplicación móvil 
                            y plataforma web Ándale Socio, operada por ARCANA CORP S.A.C., con RUC 20612123901.
                        </p>

                        <ul className="__article_list">

                            <li>
                                <h3>1. Aceptación del usuario</h3>
                                <p className="__article_parragraph">
                                    Al acceder o utilizar Ándale Socio, aceptas expresamente estos Términos. 
                                    Si no estás de acuerdo, no debes utilizar nuestros servicios.
                                </p>
                            </li>

                            <li>
                                <h3>2. Descripción del servicio</h3>
                                <p className="__article_parragraph">
                                    Ándale Socio es una plataforma digital que permite a los usuarios 
                                    publicar productos en un catálogo web y realizar pedidos mediante WhatsApp. 
                                    Nos dirigimos tanto a vendedores como a compradores. 
                                </p>
                            </li>

                            <li>
                                <h3>3. Registro de usuario</h3>
                                <p className="__article_parragraph">
                                    Para utilizar ciertas funciones, deberás registrarte y proporcionar información real, 
                                    como nombre y número de teléfono. ARCANA CORP S.A.C. se reserva el derecho de suspender
                                    cuentas con información falsa o uso indebido.
                                </p>
                            </li>

                            <li>
                                <h3>4. Contenido publicado por usuarios</h3>
                                <p className="__article_parragraph">Los usuarios son responsables del contenido que suban (productos, imágenes, descripciones). Está prohibido:</p>
                                <ul className="__article_sub_list">
                                    <li>Publicar productos ilícitos o falsificados</li>
                                    <li>Usar lenguaje ofensivo</li>
                                    <li>Violar derechos de autor o marcas</li>
                                    <li>Nos reservamos el derecho de eliminar cualquier contenido que incumpla estas normas.</li>
                                </ul>
                            </li>

                            <li>
                                <h3>5. Propiedad intelectual</h3>
                                <p className="__article_parragraph">
                                    El diseño, software, logotipos y demás elementos de la plataforma son propiedad de ARCANA CORP S.A.C.
                                    Los productos publicados siguen siendo propiedad del usuario, pero autorizan su uso dentro del catálogo digital.
                                </p>
                            </li>
                            
                            <li>
                                <h3>6. Responsabilidad</h3>
                                <p className="__article_parragraph">
                                    ARCANA CORP S.A.C. no garantiza la continuidad del servicio ni se responsabiliza 
                                    por daños derivados del uso del mismo. Las transacciones entre usuarios se realizan 
                                    bajo su propio riesgo.
                                </p>
                            </li>

                            <li>
                                <h3>7. Modificaciones</h3>
                                <p className="__article_parragraph">
                                    Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                                    Las modificaciones se informarán oportunamente mediante la app o el sitio web.
                                </p>
                            </li>

                        </ul>

                    </article>

                    <div className="__line"></div>

                    <article className="__article">
                        <h2 className="__article_tit">🍪 Política de Cookies y Publicidad</h2>
                        <p className="__article_parragraph">Ándale Socio utiliza cookies y tecnologías similares para mejorar la experiencia del usuario. Las cookies nos permiten:</p>
                        <ul className="__article_list __article_list_style">
                            <li>Recordar sesiones activas</li>
                            <li>Analizar el comportamiento de navegación (Google Analytics u otros)</li>
                            <li>Enviar publicidad segmentada (si se activa en el futuro)</li>
                        </ul>
                        <p className="__article_parragraph">Puedes deshabilitar las cookies desde tu navegador, pero algunas funciones podrían verse afectadas.</p>
                    </article>

                </main>

            </div>
        
        </>

    )

}