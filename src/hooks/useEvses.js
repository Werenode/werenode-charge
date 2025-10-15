import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

/**
 * options:
 * - bounds: { south, north, west, east }  // pour filtrage par emprise
 * - filters: { minPowerKW, status, type } // tes filtres UI
 * - collectionName: par défaut "evse"
 * - fallback: [] données locales si Firestore indispo
 */
export function useEvses({ bounds, filters, collectionName = "evse", fallback = [] } = {}) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, collectionName);
    const clauses = [];

    // filtres simples (adaptés à ton schéma)
    if (filters?.minPowerKW) {
      clauses.push(where("powerKW", ">=", Number(filters.minPowerKW)));
    }
    if (filters?.status) {
      clauses.push(where("status", "==", filters.status));
    }
    // si tu as un type (AC/DC)
    if (filters?.type) {
      clauses.push(where("type", "==", filters.type));
    }

    // filtrage par emprise (attention: Firestore n'est pas géospatial → 4 where)
    if (bounds) {
      clauses.push(where("lat", ">=", bounds.south));
      clauses.push(where("lat", "<=", bounds.north));
      clauses.push(where("lng", ">=", bounds.west));
      clauses.push(where("lng", "<=", bounds.east));
    }

    const q = clauses.length ? query(colRef, ...clauses) : colRef;
    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setData(list);
      setLoading(false);
    }, () => {
      // fallback si Firestore plante
      setData(fallback);
      setLoading(false);
    });

    return () => unsub();
  }, [collectionName, JSON.stringify(bounds), JSON.stringify(filters)]);

  return { data, loading };
}
