export function Button({ children, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
