export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 resize-none ${className}`}
      {...props}
    />
  )
}
