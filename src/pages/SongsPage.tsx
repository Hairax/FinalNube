import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCanciones, Cancion } from "@/hooks/CancionesHook";
import { useArtistas } from "@/hooks/ArtistasHook";
import { NavBar } from "@/components/navBar";
import { FaEdit, FaTrash } from "react-icons/fa";

export function SongsPage() {
  const { artistaId } = useParams<{ artistaId?: string }>();
  const { canciones, loading, error, getByArtista } = useCanciones();
  const [filtered, setFiltered] = useState<Cancion[]>([]);
  const [current, setCurrent] = useState<Cancion | null>(null);
  const { artistas } = useArtistas();

  // Mapeo de artistas por id para acceso rápido
  const artistasMap = useMemo(() => {
    const map: Record<string, string> = {};
    artistas.forEach((a) => {
      map[a.id] = a.Nombre;
    });
    return map;
  }, [artistas]);

  useEffect(() => {
    const fetch = async () => {
      if (artistaId) {
        // Filtrar localmente porque en tu hook el campo es 'Artista' (mayúscula)
        setFiltered(canciones.filter((c) => c.Artista === artistaId));
      } else {
        setFiltered(canciones);
      }
    };
    fetch();
  }, [artistaId, canciones]);

  return (
    <div className="bg-gradient-to-br from-[#232526] to-[#414345] text-white min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 py-8 gap-8 flex-col md:flex-row animate-fade-in">
        {/* Lista de canciones */}
        <div className="w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 drop-shadow-lg">
            Canciones
          </h1>
          {loading ? (
            <div className="text-center">Cargando...</div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : (
            <ul className="space-y-6">
              {filtered.map((cancion) => (
                <li
                  key={cancion.id}
                  className={`relative bg-white/5 backdrop-blur-md shadow-xl rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 border border-transparent hover:border-green-400 hover:scale-[1.025] group ${
                    current?.id === cancion.id
                      ? "ring-2 ring-green-400 scale-105"
                      : ""
                  } animate-fade-in`}
                  onClick={() => setCurrent(cancion)}
                >
                  <img
                    src="https://www.shutterstock.com/shutterstock/photos/1938370762/display_1500/stock-vector-music-icon-vector-design-element-logo-template-1938370762.jpg"
                    alt="cover"
                    className="w-16 h-16 rounded-xl object-cover shadow-md border-2 border-white/10 bg-gray-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg truncate text-white drop-shadow-sm">
                      {cancion.Nombre}
                    </div>
                    <div className="text-sm text-gray-300 truncate">
                      Artista: {artistasMap[cancion.Artista] || "Desconocido"}
                    </div>
                  </div>
                  <button
                    className="p-2 rounded-full bg-yellow-500/80 hover:bg-yellow-400 text-white hover:text-yellow-900 transition flex items-center justify-center mr-1 group/edit"
                    title="Editar"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("editar", cancion.id);
                    }}
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    className="p-2 rounded-full bg-red-600/80 hover:bg-red-500 text-white hover:text-red-900 transition flex items-center justify-center group/delete"
                    title="Eliminar"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("eliminar", cancion.id);
                    }}
                  >
                    <FaTrash size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Reproductor */}
        <div className="w-full md:w-1/3 lg:w-1/2 flex flex-col items-center justify-center mt-8 md:mt-0">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center border border-white/10 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-400 drop-shadow">
              Reproductor
            </h2>
            {current ? (
              <>
                <img
                  src="https://www.shutterstock.com/shutterstock/photos/1938370762/display_1500/stock-vector-music-icon-vector-design-element-logo-template-1938370762.jpg"
                  alt="cover"
                  className="w-32 h-32 rounded-2xl object-cover shadow-lg mb-4 border-2 border-white/20 bg-gray-700"
                />
                <div className="mb-4 text-center">
                  <div className="text-xl font-bold text-white drop-shadow-sm truncate">
                    {current.Nombre}
                  </div>
                  <div className="text-md text-gray-300 truncate">
                    Artista: {artistasMap[current.Artista] || "Desconocido"}
                  </div>
                </div>
                <audio
                  src={current.Cancion}
                  controls
                  autoPlay
                  className="w-full rounded-lg bg-gray-900/80"
                  onCanPlay={() => console.log("Audio listo para reproducir")}
                  onError={() =>
                    alert(
                      "No se pudo reproducir la canción. Verifica el enlace o el formato."
                    )
                  }
                />
              </>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <img
                  src="https://www.shutterstock.com/shutterstock/photos/1938370762/display_1500/stock-vector-music-icon-vector-design-element-logo-template-1938370762.jpg"
                  alt="cover"
                  className="w-24 h-24 rounded-2xl object-cover shadow mb-4 border-2 border-white/10 bg-gray-700"
                />
                <span>Selecciona una canción para reproducir</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Animación fade-in */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
