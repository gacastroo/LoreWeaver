import prisma from '../lib/prisma.js'

// Crear historia
export const crearHistoria = async (req, res) => {
  const { titulo } = req.body
  try {
    const historia = await prisma.historia.create({
      data: { titulo }
    })
    res.status(201).json(historia)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear historia' })
  }
}

// Obtener todas las historias
export const obtenerHistorias = async (req, res) => {
  try {
    const historias = await prisma.historia.findMany({
      include: {
        personajes: true,
        capitulos: true,
        escenas: true,
        universos: true,
        tags: true
      }
    })
    res.json(historias)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historias' })
  }
}

// Obtener una historia por ID
export const obtenerHistoria = async (req, res) => {
  const { id } = req.params
  try {
    const historia = await prisma.historia.findUnique({
      where: { id: parseInt(id) },
      include: {
        personajes: true,
        capitulos: true,
        escenas: true,
        universos: true,
        tags: true
      }
    })
    if (!historia) return res.status(404).json({ error: 'Historia no encontrada' })
    res.json(historia)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historia' })
  }
}

// Actualizar historia
export const actualizarHistoria = async (req, res) => {
  const { id } = req.params
  const { titulo } = req.body
  try {
    const historia = await prisma.historia.update({
      where: { id: parseInt(id) },
      data: { titulo }
    })
    res.json(historia)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar historia' })
  }
}

// Eliminar historia
export const eliminarHistoria = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.historia.delete({
      where: { id: parseInt(id) }
    })
    res.json({ message: 'Historia eliminada' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar historia' })
  }
}
