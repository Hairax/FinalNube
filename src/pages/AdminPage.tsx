import { useGeneros } from "../hooks/GenerosHook";
import { useArtistas } from "../hooks/ArtistasHook";
import { useCanciones } from "../hooks/CancionesHook";
import { useState } from "react";
import { uploadToCloudinary } from "../utils/uploadToCloudinary"; // la función que vimos arriba
import { NavBar } from "@/components/navBar";
import { usePerfilUsuario } from "../hooks/UserHook";

export const AdminPage = () => {
  const {
    perfil,
    loading: loadingPerfil,
    error: errorPerfil,
  } = usePerfilUsuario();
  const { generos, crearGenero } = useGeneros();
  const { artistas, create: crearArtista } = useArtistas();
  const { create: crearCancion } = useCanciones();

  const [nombreGenero, setNombreGenero] = useState("");
  const [imgGenero, setImgGenero] = useState<File | null>(null);

  const [nombreArtista, setNombreArtista] = useState("");
  const [imgArtista, setImgArtista] = useState<File | null>(null);
  const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>(
    []
  );

  const [nombreCancion, setNombreCancion] = useState("");
  const [archivoCancion, setArchivoCancion] = useState<File | null>(null);
  const [artistaSeleccionado, setArtistaSeleccionado] = useState("");

  // Previews
  const [previewGenero, setPreviewGenero] = useState<string | null>(null);
  const [previewArtista, setPreviewArtista] = useState<string | null>(null);
  const [previewCancion, setPreviewCancion] = useState<string | null>(null);

  // Handlers
  const handleCrearGenero = async () => {
    if (!imgGenero) return alert("Selecciona imagen");
    const url = await uploadToCloudinary(imgGenero, "image");
    await crearGenero({ Nombre: nombreGenero, img: url });
    setNombreGenero("");
    setImgGenero(null);
  };

  const handleCrearArtista = async () => {
    if (!imgArtista || generosSeleccionados.length === 0)
      return alert("Faltan campos");
    const url = await uploadToCloudinary(imgArtista, "image");
    await crearArtista({
      Nombre: nombreArtista,
      img: url,
      generos: generosSeleccionados,
    });
    setNombreArtista("");
    setImgArtista(null);
    setGenerosSeleccionados([]);
  };

  const handleCrearCancion = async () => {
    if (!archivoCancion || !artistaSeleccionado) return alert("Faltan campos");
    const url = await uploadToCloudinary(archivoCancion, "audio");
    await crearCancion({
      Nombre: nombreCancion,
      Cancion: url,
      Artista: artistaSeleccionado,
    });
    setNombreCancion("");
    setArchivoCancion(null);
    setArtistaSeleccionado("");
  };

  // Previews handlers
  const handleImgGenero = (file: File | null) => {
    setImgGenero(file);
    if (file) setPreviewGenero(URL.createObjectURL(file));
    else setPreviewGenero(null);
  };
  const handleImgArtista = (file: File | null) => {
    setImgArtista(file);
    if (file) setPreviewArtista(URL.createObjectURL(file));
    else setPreviewArtista(null);
  };
  const handleArchivoCancion = (file: File | null) => {
    setArchivoCancion(file);
    if (file) setPreviewCancion(URL.createObjectURL(file));
    else setPreviewCancion(null);
  };

  // Chips de selección múltiple para géneros
  const toggleGenero = (id: string) => {
    setGenerosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((gid) => gid !== id) : [...prev, id]
    );
  };

  if (loadingPerfil)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Cargando perfil...
      </div>
    );
  if (errorPerfil || !perfil || perfil.Role !== "Admin")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <NavBar />
        <div className="bg-red-800/80 rounded-lg p-8 mt-8 shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-2">Acceso denegado</h2>
          <p>No tienes permisos para acceder a esta página.</p>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <NavBar />
      <div className="p-4 max-w-4xl mx-auto space-y-8">
        {/* Crear Género */}
        <section className="bg-gray-800/80 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 w-full">
            <h2 className="text-xl font-bold mb-4 text-green-400">
              Crear Género
            </h2>
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Nombre"
              value={nombreGenero}
              onChange={(e) => setNombreGenero(e.target.value)}
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              type="file"
              accept="image/*"
              onChange={(e) => handleImgGenero(e.target.files?.[0] || null)}
            />
            <button
              className="w-full py-2 rounded bg-green-500 hover:bg-green-600 font-bold mt-2 transition"
              onClick={handleCrearGenero}
            >
              Crear
            </button>
          </div>
          {previewGenero && (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={previewGenero}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </section>

        {/* Crear Artista */}
        <section className="bg-gray-800/80 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 w-full">
            <h2 className="text-xl font-bold mb-4 text-blue-400">
              Crear Artista
            </h2>
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nombre"
              value={nombreArtista}
              onChange={(e) => setNombreArtista(e.target.value)}
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              type="file"
              accept="image/*"
              onChange={(e) => handleImgArtista(e.target.files?.[0] || null)}
            />
            <div className="mb-2">
              <div className="mb-1 text-sm text-gray-300">
                Selecciona uno o más géneros:
              </div>
              <div className="flex flex-wrap gap-2">
                {generos.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className={`px-3 py-1 rounded-full border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      generosSeleccionados.includes(g.id)
                        ? "bg-blue-500 text-white border-blue-500 shadow"
                        : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-blue-600 hover:text-white"
                    }`}
                    onClick={() => toggleGenero(g.id)}
                  >
                    {g.Nombre}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="w-full py-2 rounded bg-blue-500 hover:bg-blue-600 font-bold mt-2 transition"
              onClick={handleCrearArtista}
            >
              Crear
            </button>
          </div>
          {previewArtista && (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={previewArtista}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </section>

        {/* Crear Canción */}
        <section className="bg-gray-800/80 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 w-full">
            <h2 className="text-xl font-bold mb-4 text-pink-400">
              Crear Canción
            </h2>
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nombre"
              value={nombreCancion}
              onChange={(e) => setNombreCancion(e.target.value)}
            />
            <input
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              type="file"
              accept="audio/*"
              onChange={(e) =>
                handleArchivoCancion(e.target.files?.[0] || null)
              }
            />
            <select
              className="w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              value={artistaSeleccionado}
              onChange={(e) => setArtistaSeleccionado(e.target.value)}
            >
              <option value="">Selecciona un artista</option>
              {artistas.map((a) => (
                <option key={a.id} value={a.id} className="bg-gray-900">
                  {a.Nombre}
                </option>
              ))}
            </select>
            <button
              className="w-full py-2 rounded bg-pink-500 hover:bg-pink-600 font-bold mt-2 transition"
              onClick={handleCrearCancion}
            >
              Crear
            </button>
          </div>
          {previewCancion && (
            <div className="w-64 flex flex-col items-center justify-center bg-gray-700 rounded-lg overflow-hidden p-2">
              <audio
                src={previewCancion}
                controls
                className="w-full h-16"
                style={{ minWidth: "200px" }}
              />
              <span className="text-xs text-gray-300 mt-1">
                Vista previa de la canción
              </span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
