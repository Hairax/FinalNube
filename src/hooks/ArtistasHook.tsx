import { useEffect, useState } from "react";
import { firebaseDb } from "../firebase/Firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export interface Artista {
  id: string;
  Nombre: string;
  img: string;
  generos: string[];
}

export function useArtistas() {
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener todos los artistas
  const getAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(firebaseDb, "Artista"));
      const data: Artista[] = [];
      querySnapshot.forEach((docu) => {
        const d = docu.data() as Omit<Artista, "id">;
        data.push({ id: docu.id, ...d });
      });
      setArtistas(data);
    } catch (e) {
      setError("Error al cargar artistas");
    } finally {
      setLoading(false);
    }
  };

  // Obtener artista por ID
  const getById = async (id: string): Promise<Artista | null> => {
    try {
      const docRef = doc(firebaseDb, "Artista", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Artista;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Obtener artistas por género (donde generos incluye el id)
  const getByGenero = async (generoId: string): Promise<Artista[]> => {
    try {
      const q1 = query(
        collection(firebaseDb, "Artista"),
        where("generos", "array-contains", generoId)
      );
      const q2 = query(
        collection(firebaseDb, "Artista"),
        where("genero", "array-contains", generoId)
      );

      const [snapshot1, snapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
      ]);

      // Unir resultados y eliminar duplicados por id
      const allDocs = [...snapshot1.docs, ...snapshot2.docs];
      const uniqueMap = new Map<string, Artista>();
      allDocs.forEach((docu) => {
        uniqueMap.set(docu.id, { id: docu.id, ...docu.data() } as Artista);
      });
      return Array.from(uniqueMap.values());
    } catch {
      return [];
    }
  };

  // Crear artista
  const create = async (nuevo: Omit<Artista, "id">) => {
    try {
      const docRef = await addDoc(collection(firebaseDb, "Artista"), nuevo);
      setArtistas((prev) => [...prev, { id: docRef.id, ...nuevo }]);
    } catch {
      setError("Error al crear artista");
    }
  };

  // Editar artista
  const update = async (id: string, data: Partial<Omit<Artista, "id">>) => {
    try {
      const artistaRef = doc(firebaseDb, "Artista", id);
      await updateDoc(artistaRef, data);
      setArtistas((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...data } : a))
      );
    } catch {
      setError("Error al editar artista");
    }
  };

  // Eliminar artista
  const remove = async (id: string) => {
    try {
      const artistaRef = doc(firebaseDb, "Artista", id);
      await deleteDoc(artistaRef);
      setArtistas((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError("Error al eliminar artista");
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    artistas,
    loading,
    error,
    getAll,
    getById,
    getByGenero,
    create,
    update,
    remove,
  };
}
