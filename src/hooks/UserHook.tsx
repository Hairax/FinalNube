import { useEffect, useState } from "react";
import { firebaseAuth, firebaseDb } from "../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export interface PerfilUsuario {
  id: string;
  UserName?: string;
  Role?: string;
  Likes?: string[];
}

export function usePerfilUsuario() {
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      setLoading(true);
      setError(null);
      try {
        const user: User | null = firebaseAuth.currentUser;
        if (!user) {
          setError("No hay usuario autenticado");
          setPerfil(null);
          setLoading(false);
          return;
        }
        const docRef = doc(firebaseDb, "user", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPerfil({ id: user.uid, ...docSnap.data() } as PerfilUsuario);
        } else {
          setPerfil({ id: user.uid || "" });
        }
      } catch (e) {
        setError("Error al cargar el perfil");
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

  return { perfil, loading, error };
}
