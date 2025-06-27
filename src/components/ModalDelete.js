import './styles/modal.css'

export default function ModalDelete ({ modal, handleDelete, handleViewModal }) {

    return (

        <>
        
            <div className={`__overlay ${modal ? '__overlay--active' : ''}`}>
                <div className="__modal">
                    <h3>¿Deseas eliminar el producto?</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <button className="__btn" onClick={handleViewModal}>Cancelar</button>
                        <button className="__btn __btn_primary" onClick={handleDelete}>Si, eliminar</button>
                    </div>
                </div>
            </div>

        </>

    )

}