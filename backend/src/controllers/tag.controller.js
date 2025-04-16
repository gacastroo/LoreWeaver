import prisma from '../prisma.js'

// Crear un nuevo tag vinculado a una historia
export const crearTag = async (req, res) => {
  const { nombre_tag, historiaId } = req.body
  try {
    const tag = await prisma.tags.create({
      data: { nombre_tag, historiaId }
    })
    res.status(201).json(tag)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tag' })
  }
}

// Obtener todos los tags
export const obtenerTags = async (req, res) => {
  try {
    const tags = await prisma.tags.findMany({
      include: { personajes: true }
    })
    res.json(tags)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tags' })
  }
}

// Asignar un tag a un personaje
export const asignarTag = async (req, res) => {
  const { personajeId, tagId } = req.body
  try {
    const relacion = await prisma.personaje_Tag.create({
      data: { personajeId, tagId }
    })
    res.status(201).json(relacion)
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar tag al personaje' })
  }
}

// Eliminar un tag de un personaje
export const eliminarTagDePersonaje = async (req, res) => {
  const { personajeId, tagId } = req.body
  try {
    await prisma.personaje_Tag.deleteMany({
      where: { personajeId, tagId }
    })
    res.json({ message: 'Tag eliminado del personaje' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tag del personaje' })
  }
}

// Obtener tags de un personaje
export const obtenerTagsDePersonaje = async (req, res) => {
  const { id } = req.params
  try {
    const relaciones = await prisma.personaje_Tag.findMany({
      where: { personajeId: parseInt(id) },
      include: { tag: true }
    })
    const tags = relaciones.map(r => r.tag)
    res.json(tags)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tags del personaje' })
  }
}
