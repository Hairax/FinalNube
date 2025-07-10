import { useEffect, useState } from "react";
import { useArtistas, Artista } from "@/hooks/ArtistasHook";
import { NavBar } from "@/components/navBar";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

export function ArtistsPage() {
  const { generoId } = useParams<{ generoId?: string }>();
  const { artistas, loading, error, getByGenero } = useArtistas();
  const [filtered, setFiltered] = useState<Artista[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      if (generoId) {
        const result = await getByGenero(generoId);
        setFiltered(result);
      } else {
        setFiltered(artistas);
      }
    };
    fetch();
  }, [generoId, artistas, getByGenero]);

  // Filtrado por búsqueda
  const artistasFiltrados = filtered.filter((a) =>
    a.Nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleClickArtista = (artistaId: string) => {
    navigate(`/songs/${artistaId}`);
  };

  return (
    <div className="bg-gradient-to-br from-[#232526] to-[#414345] min-h-screen text-white flex flex-col">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-10 w-full flex-1 animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 drop-shadow-lg">
          Artistas
        </h1>
        {/* Buscador */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar artista..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg backdrop-blur-md"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-green-300" />
          </div>
        </div>
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {artistasFiltrados.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 text-lg">
                No se encontraron artistas.
              </div>
            ) : (
              artistasFiltrados.map((artista) => (
                <div
                  key={artista.id}
                  className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-green-400 flex flex-col animate-fade-in"
                  onClick={() => handleClickArtista(artista.id)}
                >
                  <div className="relative w-full h-44 overflow-hidden">
                    <img
                      src={artista.img}
                      alt={artista.Nombre}
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col items-center justify-center flex-1">
                    <h2 className="text-xl font-bold text-center text-green-300 group-hover:text-green-400 drop-shadow mb-2">
                      {artista.Nombre}
                    </h2>
                    <div className="flex justify-center gap-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("editar", artista.id);
                        }}
                        className="p-2 rounded-full bg-yellow-500/80 hover:bg-yellow-400 text-white hover:text-yellow-900 transition flex items-center justify-center mr-1"
                        title="Editar"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("eliminar", artista.id);
                        }}
                        className="p-2 rounded-full bg-red-600/80 hover:bg-red-500 text-white hover:text-red-900 transition flex items-center justify-center"
                        title="Eliminar"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
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
