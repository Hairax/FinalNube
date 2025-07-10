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

export interface Cancion {
  id: string;
  Nombre: string;
  Cancion: string;
  Artista: string; // id del artista
}

export function useCanciones() {
  const [canciones, setCanciones] = useState<Cancion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener todas las canciones
  const getAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(firebaseDb, "canciones"));
      const data: Cancion[] = [];
      querySnapshot.forEach((docu) => {
        const d = docu.data() as Omit<Cancion, "id">;
        data.push({ id: docu.id, ...d });
      });
      setCanciones(data);
    } catch (e) {
      setError("Error al cargar canciones");
    } finally {
      setLoading(false);
    }
  };

  // Obtener canción por ID
  const getById = async (id: string): Promise<Cancion | null> => {
    try {
      const docRef = doc(firebaseDb, "canciones", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Cancion;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Obtener canciones por artista
  const getByArtista = async (artistaId: string): Promise<Cancion[]> => {
    try {
      const q = query(
        collection(firebaseDb, "canciones"),
        where("artista", "==", artistaId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (docu) => ({ id: docu.id, ...docu.data() } as Cancion)
      );
    } catch {
      return [];
    }
  };

  // Crear canción
  const create = async (nuevo: Omit<Cancion, "id">) => {
    try {
      const docRef = await addDoc(collection(firebaseDb, "canciones"), nuevo);
      setCanciones((prev) => [...prev, { id: docRef.id, ...nuevo }]);
    } catch {
      setError("Error al crear canción");
    }
  };

  // Editar canción
  const update = async (id: string, data: Partial<Omit<Cancion, "id">>) => {
    try {
      const cancionRef = doc(firebaseDb, "canciones", id);
      await updateDoc(cancionRef, data);
      setCanciones((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...data } : c))
      );
    } catch {
      setError("Error al editar canción");
    }
  };

  // Eliminar canción
  const remove = async (id: string) => {
    try {
      const cancionRef = doc(firebaseDb, "canciones", id);
      await deleteDoc(cancionRef);
      setCanciones((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Error al eliminar canción");
    }
  };

  useEffect(() => {
    getAll();
    // eslint-disable-next-line
  }, []);

  return {
    canciones,
    loading,
    error,
    getAll,
    getById,
    getByArtista,
    create,
    update,
    remove,
  };
}
