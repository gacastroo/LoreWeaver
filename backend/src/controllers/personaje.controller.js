import prisma from '../lib/prisma.js'

// Crear personaje
export const crearPersonaje = async (req, res) => {
  const { nombre_personaje, descripcion_personaje, historiaId } = req.body
  console.log("📥 Datos recibidos para crear personaje:", req.body)

  try {
    const personaje = await prisma.personaje.create({
      data: {
        nombre_personaje,
        descripcion_personaje,
        historiaId: parseInt(historiaId)  // 💡 Asegura que es un número
      }
    })
    res.status(201).json(personaje)
  } catch (error) {
    console.error("❌ Error al crear personaje:", error)
    res.status(500).json({ error: 'Error al crear personaje', detalle: error.message })
  }
}

// Obtener todos los personajes con sus tags
export const obtenerPersonajes = async (req, res) => {
  try {
    const personajes = await prisma.personaje.findMany({
      include: {
        tags: {
          include: {
            tag: true  // Esto incluye el nombre del tag desde la relación intermedia
          }
        }
      }
    });
    res.json(personajes);
  } catch (error) {
    console.error("❌ Error al obtener personajes:", error);
    res.status(500).json({ error: 'Error al obtener personajes' });
  }
};


// Obtener personaje por ID
export const obtenerPersonaje = async (req, res) => {
  const { id } = req.params
  try {
    const personaje = await prisma.personaje.findUnique({
      where: { id_Personaje: parseInt(id) }
    })
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' })
    res.json(personaje)
  } catch (error) {
    console.error("❌ Error al obtener personaje:", error)
    res.status(500).json({ error: 'Error al obtener personaje' })
  }
}

// Actualizar personaje
export const actualizarPersonaje = async (req, res) => {
  const { id } = req.params
  const { nombre_personaje, descripcion_personaje } = req.body
  try {
    const personaje = await prisma.personaje.update({
      where: { id_Personaje: parseInt(id) },
      data: { nombre_personaje, descripcion_personaje }
    })
    res.json(personaje)
  } catch (error) {
    console.error("❌ Error al actualizar personaje:", error)
    res.status(500).json({ error: 'Error al actualizar personaje' })
  }
}

// Eliminar personaje
export const eliminarPersonaje = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.personaje.delete({
      where: { id_Personaje: parseInt(id) }
    })
    res.json({ message: 'Personaje eliminado' })
  } catch (error) {
    console.error("❌ Error al eliminar personaje:", error)
    res.status(500).json({ error: 'Error al eliminar personaje' })
  }
}
