function DeleteCard({onConfirm}){
    return(
        <>
            <button type="button" className="popup__btn" onClick={onConfirm}>Sim</button>
        </>
    )
}

export default DeleteCard