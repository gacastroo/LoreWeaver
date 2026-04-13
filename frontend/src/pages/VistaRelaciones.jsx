import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Globe, BookOpen, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export default function VistaRelaciones() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [relaciones, setRelaciones] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, t } = useApp();
  const isLight = theme === "light";

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

  if (loading) return <p className={`p-6 ${isLight ? "text-neutral-700" : "text-zinc-400"}`}>{t.cargando}</p>;
  if (!relaciones) return <p className={`p-6 ${isLight ? "text-neutral-500" : "text-zinc-500"}`}>{t.noHay} datos relacionados.</p>;

  const { personajes, universos, capitulos, escenas } = relaciones;

  const secciones = [
    { titulo: t.tituloPersonajes, icono: <Users className="w-5 h-5 text-indigo-500 mr-2" />, items: personajes, key: "id_Personaje", nombre: "nombre_personaje", ruta: "/characters" },
    { titulo: t.tituloUniversos, icono: <Globe className="w-5 h-5 text-green-500 mr-2" />, items: universos, key: "id_Universo", nombre: "titulo_universo", ruta: "/universes" },
    { titulo: t.tituloCapitulos, icono: <BookOpen className="w-5 h-5 text-yellow-500 mr-2" />, items: capitulos, key: "id_Capitulo", nombre: "titulo_capitulo", ruta: "/chapters" },
    { titulo: t.tituloEscenas, icono: <Film className="w-5 h-5 text-sky-500 mr-2" />, items: escenas, key: "id_Escena", nombre: "titulo_escena", ruta: "/scenes" },
  ];

  return (
    <div className={`p-8 max-w-6xl mx-auto space-y-6 min-h-screen ${isLight ? "bg-white" : "bg-zinc-950"}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-2xl font-bold ${isLight ? "text-neutral-800" : "text-gray-100"}`}>{t.elementosRelacionados}</h1>
        <button
          onClick={() => navigate(-1)}
          className={`text-sm hover:underline ${isLight ? "text-neutral-600" : "text-zinc-400"}`}
        >
          {t.volver}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secciones.map(({ titulo, icono, items, key, nombre, ruta }) => (
          <Card
            key={titulo}
            className={`shadow-sm border text-left flex flex-col max-w-full ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}
          >
            <CardHeader className="px-4 pt-4 pb-2 mb-3">
              <div className="flex items-center">
                {icono}
                <CardTitle className={`text-lg ${isLight ? "text-neutral-700" : "text-gray-200"}`}>{titulo}</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="px-4 pt-0 pb-4 flex flex-col flex-1">
              {items && items.length > 0 ? (
                <>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {items.slice(0, 4).map((item) => (
                      <li
                        key={item[key]}
                        className={`px-3 py-1 rounded text-sm border ${isLight ? "bg-neutral-100 text-neutral-800 border-neutral-300" : "bg-zinc-700 text-zinc-200 border-zinc-600"}`}
                      >
                        {item[nombre]}
                      </li>
                    ))}
                    {items.length > 4 && (
                      <li className={`px-3 py-1 rounded text-sm border ${isLight ? "bg-neutral-200 text-neutral-600 border-neutral-400" : "bg-zinc-600 text-zinc-300 border-zinc-500"}`}>
                        +{items.length - 4} {t.masDe}
                      </li>
                    )}
                  </ul>
                  <Button
                    onClick={() => navigate(ruta)}
                    className="self-start text-sm px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                  >
                    {t.verMas}
                  </Button>
                </>
              ) : (
                <p className={`text-sm italic ${isLight ? "text-neutral-400" : "text-zinc-500"}`}>
                  {t.noHay} {titulo.toLowerCase()} {t.disponiblesAun}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
