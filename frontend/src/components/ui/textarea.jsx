export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 resize-none ${className}`}
      {...props}
    />
  )
}
