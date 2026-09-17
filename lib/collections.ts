import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

// Collection names in Firestore. Create these (or let them be created
// automatically on first write) in the Firebase console.
export const COLLECTIONS = {
  journal: "journalPosts",
  travel: "travelPosts",
  blog: "blogPosts",
  gallery: "galleryImages",
} as const;

type CollectionKey = keyof typeof COLLECTIONS;

// Generic helpers. `T` should NOT include `id` — Firestore's document id is
// attached separately when reading.
export async function getAllDocs<T>(key: CollectionKey): Promise<(T & { id: string })[]> {
  const snap = await getDocs(
    query(collection(db, COLLECTIONS[key]), orderBy("date", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

export async function getDocById<T>(
  key: CollectionKey,
  id: string
): Promise<(T & { id: string }) | null> {
  const snap = await getDoc(doc(db, COLLECTIONS[key], id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as T) };
}

export async function getDocBySlug<T>(
  key: CollectionKey,
  slug: string
): Promise<(T & { id: string }) | null> {
  const snap = await getDocs(
    query(collection(db, COLLECTIONS[key]), where("slug", "==", slug))
  );
  if (snap.empty) return null;
  const d = snap.docs[0];
  if (!d) return null;
  return { id: d.id, ...(d.data() as T) };
}

export async function createDoc<T extends object>(key: CollectionKey, data: T) {
  const ref = await addDoc(collection(db, COLLECTIONS[key]), data);
  return ref.id;
}

export async function updateDocById<T extends object>(
  key: CollectionKey,
  id: string,
  data: Partial<T>
) {
  await updateDoc(doc(db, COLLECTIONS[key], id), data);
}

export async function deleteDocById(key: CollectionKey, id: string) {
  await deleteDoc(doc(db, COLLECTIONS[key], id));
}

// Gallery has no `date` field to sort by — fetch without ordering.
export async function getAllGalleryDocs<T>(): Promise<(T & { id: string })[]> {
  const snap = await getDocs(collection(db, COLLECTIONS.gallery));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}
