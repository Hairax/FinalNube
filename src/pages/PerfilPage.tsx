import { NavBar } from "@/components/navBar";
import { usePerfilUsuario } from "@/hooks/UserHook";

export function PerfilPage() {
  const { perfil, loading, error } = usePerfilUsuario();

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Perfil de Usuario
          </h1>
          {loading && <p className="text-center">Cargando perfil...</p>}
          {error && <p className="text-center text-red-400">{error}</p>}
          {perfil && (
            <div className="space-y-4">
              <div>
                <span className="font-semibold">ID:</span> {perfil.id}
              </div>
              {perfil.UserName && (
                <div>
                  <span className="font-semibold">Nombre de usuario:</span>{" "}
                  {perfil.UserName}
                </div>
              )}
              {perfil.Role && (
                <div>
                  <span className="font-semibold">Rol:</span> {perfil.Role}
                </div>
              )}
              {perfil.Likes && perfil.Likes.length > 0 && (
                <div>
                  <span className="font-semibold">Likes:</span>{" "}
                  {perfil.Likes.join(", ")}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
