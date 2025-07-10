import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { AuthPage } from "../pages/AuthPage";
import { GenresPage } from "../pages/GenresPage";
import { ArtistsPage } from "../pages/ArtistsPage";
import { SongsPage } from "../pages/SongsPage";
import { AdminPage } from "../pages/AdminPage";
import { LoginPage } from "../pages/LoginPage";
import { PerfilPage } from "@/pages/PerfilPage";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <h2 className="text-3xl font-bold">404 - Página no encontrada</h2>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/artistas" element={<ArtistsPage />} />
        <Route path="/artistas/:generoId" element={<ArtistsPage />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/songs/:artistaId" element={<SongsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Routes>
    </Router>
  );
};
