export default function Button(props) {
    const { condition, onClick, type="button", title, variant="btn btn-primary" } = props

    return (
        <button disabled={condition} onClick={onClick} type={type} className={variant}>
            {title}
        </button>
    )
}