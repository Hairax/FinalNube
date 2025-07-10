import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export function NavBar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
  }, []);

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleProfile = () => navigate("/perfil");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-900 via-gray-900 to-green-900 text-white px-8 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-8">
        <span
          className="text-2xl font-extrabold tracking-tight cursor-pointer text-green-400 hover:text-green-300 transition"
          onClick={() => navigate("/")}
        >
          SpotifyNube
        </span>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-1 rounded text-sm font-medium transition ${
              isActive
                ? "bg-green-700 text-white"
                : "hover:bg-gray-800 hover:text-green-300"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/artistas"
          className={({ isActive }) =>
            `px-3 py-1 rounded text-sm font-medium transition ${
              isActive
                ? "bg-green-700 text-white"
                : "hover:bg-gray-800 hover:text-green-300"
            }`
          }
        >
          Artistas
        </NavLink>
        <NavLink
          to="/songs"
          className={({ isActive }) =>
            `px-3 py-1 rounded text-sm font-medium transition ${
              isActive
                ? "bg-green-700 text-white"
                : "hover:bg-gray-800 hover:text-green-300"
            }`
          }
        >
          Canciones
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `px-3 py-1 rounded text-sm font-medium transition ${
              isActive
                ? "bg-green-700 text-white"
                : "hover:bg-gray-800 hover:text-green-300"
            }`
          }
        >
          Admin
        </NavLink>
      </div>
      <div className="flex items-center gap-2">
        {userEmail ? (
          <>
            <span
              className="bg-gray-800 px-4 py-2 rounded text-sm font-medium cursor-pointer hover:bg-green-700 transition"
              onClick={handleProfile}
            >
              {userEmail}
            </span>
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-sm font-medium"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="mr-2 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-sm font-medium"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-sm font-medium"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
