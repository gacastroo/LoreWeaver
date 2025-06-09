import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GuiaLoreWeaver() {
  return (
    <ScrollArea className="h-full w-full p-4 bg-neutral-50 text-neutral-800">
      <Card className="max-w-3xl mx-auto bg-white shadow-md border border-neutral-200">
        <CardHeader>
          <CardTitle className="text-neutral-900 text-xl font-bold">📘 Guía para usar LoreWeaver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold">1. Historia</h2>
            <p>
              Todo comienza creando una historia desde el Dashboard. Es el eje central de tu proyecto narrativo.
              Al crear una historia podrás:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Asignarle un título que represente tu obra.</li>
              <li>Añadir capítulos uno por uno, como si fueran los episodios de un libro o serie.</li>
              <li>Escribir el contenido de cada capítulo y editarlo cuando lo necesites.</li>
              <li>Eliminar capítulos que ya no encajen en la narrativa.</li>
              <li>Guardar todos tus cambios y exportar la historia en PDF para compartirla o imprimirla.</li>
              <li>Visualizar todos los elementos relacionados: personajes, universos y escenas que forman parte de esa historia.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">2. Personaje</h2>
            <p>
              Desde la sección de personajes puedes crear y gestionar a los protagonistas, villanos o seres de tu mundo. 
              Aquí puedes:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Asignar un nombre, historia asociada y una descripción detallada al personaje.</li>
              <li>Editar la descripción como si fuera una ficha de rol o una biografía.</li>
              <li>Ir directamente a la historia donde ese personaje participa para verlo en contexto.</li>
              <li>Exportar su ficha en PDF para imprimirla o compartirla con otros colaboradores.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">3. Universo</h2>
            <p>
              Los universos son los mundos o contextos donde se desarrolla tu historia. En esta sección puedes:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Crear un universo con su propio nombre y una descripción que lo sitúe (ej. "Planeta Aether, gobernado por clanes").</li>
              <li>Vincularlo a una historia específica para tenerlo todo conectado.</li>
              <li>Editar su información siempre que evolucione tu mundo narrativo.</li>
              <li>Ir a la historia relacionada para ver cómo encaja todo.</li>
              <li>Exportar el universo como PDF para documentación o presentación.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">4. Capítulo</h2>
            <p>
              Los capítulos son fragmentos de tu historia. Desde el editor de historia puedes:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Agregar un nuevo capítulo con su título, como “Capítulo 3 - El despertar”.</li>
              <li>Escribir contenido dentro de cada uno y reordenarlos o eliminarlos si cambias de idea.</li>
              <li>Todo esto lo haces dentro de una historia, así mantienes tu narrativa organizada.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">5. Escena</h2>
            <p>
              Las escenas permiten detallar momentos específicos dentro de un capítulo, por ejemplo: “Combate en el bosque”.
              Puedes:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Crear escenas que estén vinculadas a capítulos, historias y universos.</li>
              <li>Ir desde una escena directamente al capítulo donde se ubica para tener contexto.</li>
              <li>Editar o eliminar escenas según evolucione tu historia.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">6. Mapa Interactivo</h2>
            <p>
              Este mapa te muestra cómo se relacionan todos los elementos. Ideal para escritores visuales.
              Puedes:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Generar un mapa donde se conectan historias, capítulos, personajes, escenas y universos.</li>
              <li>Filtrar por tipo de elemento para enfocarte solo en lo que te interesa.</li>
              <li>Exportar el mapa como PNG o PDF para compartirlo con tu equipo o lectores.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">7. Generador de Nombres</h2>
            <p>
              ¿No sabes cómo llamar a un nuevo personaje? Este generador te sugiere nombres según categorías como fantasía, ciencia ficción, etc.
              Luego, puedes crear el personaje directamente con ese nombre.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">8. Generador de Ideas Narrativas</h2>
            <p>
              ¿Bloqueo creativo? Escribe una temática como “Una rebelión en un mundo gobernado por máquinas” y la IA generará una idea narrativa completa que puedes usar como base.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">9. Chat Narrativo</h2>
            <p>
              Es como hablar con un personaje de tu historia o un narrador omnisciente. Puedes pedirle consejos, simular diálogos o que te ayude a continuar la trama.
            </p>
          </section>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
