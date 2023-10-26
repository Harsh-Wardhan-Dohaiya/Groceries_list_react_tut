const Footer = ({itemsLength}) => {
    return (
        <footer>
            <p>{itemsLength} List {itemsLength===1?"item":"items"}</p>
        </footer>
    )
}

export default Footer