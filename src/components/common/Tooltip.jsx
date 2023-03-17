export default function Tooltip({ message, position, children }) {
    return (
        <div className="group relative flex">
            {children}
            <span className={`tooltip ${position}`}>{message}</span>
        </div>
    )
}