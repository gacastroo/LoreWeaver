// src/pages/LogoScreen.jsx
export default function LogoScreen() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-300">
      <img
        src="/logo-512.webp"
        alt="LoreWeaver"
        width={256}
        height={256}
        decoding="async"
        className="w-64 h-64 object-contain drop-shadow-lg lore-logo-enter"
      />
    </div>
  );
}
