import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Globe, BookOpen, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VistaRelaciones() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [relaciones, setRelaciones] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelaciones = async () => {
      try {
        const res = await API.get(`/historias/${id}/relaciones`);
        setRelaciones(res.data);
      } catch (error) {
        console.error("Error al cargar relaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelaciones();
  }, [id]);

  if (loading) return <p className="p-6 text-neutral-700">Cargando datos...</p>;
  if (!relaciones) return <p className="p-6 text-neutral-500">No se encontraron datos relacionados.</p>;

  const { personajes, universos, capitulos, escenas } = relaciones;

  const secciones = [
    {
      titulo: "Personajes",
      icono: <Users className="w-5 h-5 text-indigo-600 mr-2" />,
      items: personajes,
      key: "id_Personaje",
      nombre: "nombre_personaje",
      ruta: "/characters"
    },
    {
      titulo: "Universos",
      icono: <Globe className="w-5 h-5 text-green-600 mr-2" />,
      items: universos,
      key: "id_Universo",
      nombre: "titulo_universo",
      ruta: "/universes"
    },
    {
      titulo: "Capítulos",
      icono: <BookOpen className="w-5 h-5 text-yellow-600 mr-2" />,
      items: capitulos,
      key: "id_Capitulo",
      nombre: "titulo_capitulo",
      ruta: "/chapters"
    },
    {
      titulo: "Escenas",
      icono: <Film className="w-5 h-5 text-sky-600 mr-2" />,
      items: escenas,
      key: "id_Escena",
      nombre: "titulo_escena",
      ruta: "/scenes"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-neutral-800">Elementos relacionados</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-white-600 hover:underline"
        >
          Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secciones.map(({ titulo, icono, items, key, nombre, ruta }) => (
          <Card
            key={titulo}
            className="shadow-sm border border-neutral-200 text-left flex flex-col max-w-full"
          >
        <CardHeader className="px-4 pt-4 pb-2 mb-3">
        <div className="flex items-center">
            {icono}
            <CardTitle className="text-lg text-neutral-700">{titulo}</CardTitle>
        </div>
        </CardHeader>


        <CardContent className="px-4 pt-0 pb-4 flex flex-col flex-1">
        {items && items.length > 0 ? (
            <>
            <ul className="flex flex-wrap gap-2 mb-4">
                {items.slice(0, 4).map((item) => (
                <li
                    key={item[key]}
                    className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded text-sm border border-neutral-300"
                >
                    {item[nombre]}
                </li>
                ))}
                {items.length > 4 && (
                <li className="bg-neutral-200 text-neutral-600 px-3 py-1 rounded text-sm border border-neutral-400">
                    +{items.length - 4} más
                </li>
                )}
            </ul>
            <Button
                onClick={() => navigate(ruta)}
                className="self-start text-sm px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            >
                Ver más
            </Button>
            </>
        ) : (
            <p className="text-sm text-neutral-400 italic">
            No hay {titulo.toLowerCase()} disponibles aún.
            </p>
        )}
        </CardContent>

          </Card>
        ))}
      </div>
    </div>
  );
}
