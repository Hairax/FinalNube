import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseDb } from "../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { NavBar } from "../components/navBar";
import { FaSearch } from "react-icons/fa";

interface Genero {
  id: string;
  Nombre: string;
  img: string;
}

export function HomePage() {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadGeneros();
  }, []);

  const loadGeneros = async () => {
    const querySnapshot = await getDocs(collection(firebaseDb, "Generos"));
    const generosData: Genero[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Genero, "id">;
      generosData.push({ id: doc.id, ...data });
    });
    setGeneros(generosData);
  };

  const handleGeneroClick = (generoId: string) => {
    navigate(`/artistas/${generoId}`);
  };

  // Filtrado de géneros por búsqueda
  const generosFiltrados = generos.filter((g) =>
    g.Nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-[#232526] to-[#414345] min-h-screen text-white flex flex-col">
      <NavBar />
      <div className="px-4 py-12 max-w-7xl mx-auto w-full flex-1 animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 drop-shadow-lg">
          Explora los Géneros Musicales
        </h1>
        {/* Buscador */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar género..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg backdrop-blur-md"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-green-300" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {generosFiltrados.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 text-lg">
              No se encontraron géneros.
            </div>
          ) : (
            generosFiltrados.map((genero) => (
              <div
                key={genero.id}
                className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-green-400 animate-fade-in"
                onClick={() => handleGeneroClick(genero.id)}
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <img
                    src={genero.img}
                    alt={genero.Nombre}
                    className="w-full h-full object-cover group-hover:opacity-80 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-5 flex flex-col items-center justify-center">
                  <h2 className="text-xl font-bold text-center text-green-300 group-hover:text-green-400 drop-shadow">
                    {genero.Nombre}
                  </h2>
                </div>
              </div>
            ))
          )}
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
