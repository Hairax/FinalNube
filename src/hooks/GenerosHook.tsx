import { useEffect, useState } from "react";
import { firebaseDb } from "../firebase/Firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export interface Genero {
  id: string;
  Nombre: string;
  img: string;
}

export function useGeneros() {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(firebaseDb, "Generos"));
      const generosData: Genero[] = [];
      querySnapshot.forEach((docu) => {
        const data = docu.data() as Omit<Genero, "id">;
        generosData.push({ id: docu.id, ...data });
      });
      setGeneros(generosData);
    } catch (e: any) {
      setError("Error al cargar los géneros");
    } finally {
      setLoading(false);
    }
  };

  const crearGenero = async (nuevo: Omit<Genero, "id">) => {
    try {
      const docRef = await addDoc(collection(firebaseDb, "Generos"), nuevo);
      setGeneros((prev) => [...prev, { id: docRef.id, ...nuevo }]);
    } catch (e) {
      setError("Error al crear género");
    }
  };

  const editarGenero = async (
    id: string,
    data: Partial<Omit<Genero, "id">>
  ) => {
    try {
      const generoRef = doc(firebaseDb, "Generos", id);
      await updateDoc(generoRef, data);
      setGeneros((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...data } : g))
      );
    } catch (e) {
      setError("Error al editar género");
    }
  };

  const eliminarGenero = async (id: string) => {
    try {
      const generoRef = doc(firebaseDb, "Generos", id);
      await deleteDoc(generoRef);
      setGeneros((prev) => prev.filter((g) => g.id !== id));
    } catch (e) {
      setError("Error al eliminar género");
    }
  };

  return {
    generos,
    loading,
    error,
    fetchGeneros,
    crearGenero,
    editarGenero,
    eliminarGenero,
  };
}
