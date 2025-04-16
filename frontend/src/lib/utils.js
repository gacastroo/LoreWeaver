/**
 * Combina nombres de clases condicionales
 * @param {string[]} classes - Clases CSS a combinar
 * @returns {string} - Clases combinadas
 */
function cn(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  
  export { cn }
  