export default function Tooltip({ message, children }) {
    return (
        <div className="group relative flex">
            {children}
            <span className="absolute top-12 -left-3 rounded dark:bg-gray-500 bg-black bg-opacity-50 p-2 text-xs text-white hidden group-hover:block">{message}</span>
        </div>
    )
}