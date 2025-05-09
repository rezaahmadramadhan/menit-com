export default function Button(props) {
    const { onClick, type="button", title, variant="btn btn-primary" } = props

    return (
        <button onClick={onClick} type={type} className={variant}>
            {title}
        </button>
    )
}