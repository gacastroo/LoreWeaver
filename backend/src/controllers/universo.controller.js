// backend/src/controllers/universo.controller.js
export const obtenerUniversos = async (req, res) => {
    try {
      const universos = await prisma.universo.findMany({
        include: {
          historia: {
            select: { titulo: true }
          }
        }
      });
      res.json(universos);
    } catch (error) {
      console.error("❌ Error al obtener universos:", error);
      res.status(500).json({ error: "Error al obtener universos" });
    }
  };
  