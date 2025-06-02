import prisma from "../lib/prisma.js"

export const obtenerElementosPorTipo = async (req, res) => {
  const userId = req.usuario?.id_usuario || req.usuario?.id
  const { tipo } = req.params

  if (!userId) return res.status(401).json({ error: "No autenticado" })

  try {
    let data = []

    switch (tipo) {
      case "historia":
        data = await prisma.historia.findMany({
          where: { usuarioId: userId },
          select: { id: true, titulo: true }
        })
        break

      case "personaje":
        data = await prisma.personaje.findMany({
          where: { usuarioId: userId },
          select: { id_Personaje: true, nombre_personaje: true }
        })
        data = data.map(p => ({ id: p.id_Personaje, nombre: p.nombre_personaje }))
        break

      case "capitulo":
        data = await prisma.capitulo.findMany({
          where: { historia: { usuarioId: userId } },
          select: { id_Capitulo: true, titulo_capitulo: true }
        })
        data = data.map(c => ({ id: c.id_Capitulo, titulo: c.titulo_capitulo }))
        break

      case "escena":
        data = await prisma.escena.findMany({
          where: { historia: { usuarioId: userId } },
          select: { id_Escena: true, titulo_escena: true }
        })
        data = data.map(e => ({ id: e.id_Escena, titulo: e.titulo_escena }))
        break

      case "universo":
        data = await prisma.universo.findMany({
          where: { usuarioId: userId },
          select: { id_Universo: true, titulo_universo: true }
        })
        data = data.map(u => ({ id: u.id_Universo, nombre: u.titulo_universo }))
        break

      default:
        return res.status(400).json({ error: "Tipo no válido" })
    }

    res.status(200).json({ elementos: data })
  } catch (err) {
    console.error("❌ Error al obtener elementos:", err)
    res.status(500).json({ error: "Error en el servidor" })
  }
}
