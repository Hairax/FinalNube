import { useEffect } from "react";
import { ui, firebaseAuth } from "../firebase/Firebase";
import "firebaseui/dist/firebaseui.css";
import { NavBar } from "@/components/navBar";

export function AuthPage() {
  useEffect(() => {
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        {
          provider: "password",
          requireDisplayName: true,
        },
      ],
      signInSuccessUrl: "/",
      callbacks: {
        signInSuccessWithAuthResult: () => false,
      },
    });
    return () => ui.reset();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-900 grid place-items-center text-white">
        <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold mb-2 text-center">Autenticación</h1>
          <p className="mb-4 text-center">Inicia sesión o regístrate</p>
          <div id="firebaseui-auth-container" className="mt-1"></div>
        </div>
      </div>
    </div>
  );
}
