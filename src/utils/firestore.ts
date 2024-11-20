import { auth, db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, Timestamp } from "firebase/firestore";

// interface data
export interface Balapan {
  id?: string;
  title: string;
  description: string;
  status: boolean;
  startDate: string;
  endDate: string;
  trackDetails: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// operasi CRUD
export const firestoreService = {
  // get collection ref
  getBalapanRef() {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("User not authenticated");
    return collection(db, "users", uid, "balapans");
  },

  // create
  async addBalapan(balapan: Omit<Balapan, "id" | "createdAt" | "updatedAt">) {
    try {
      const balapanRef = this.getBalapanRef();
      const docRef = await addDoc(balapanRef, {
        ...balapan,
        status: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error Tambah Balapan:", error);
      throw error;
    }
  },

  // read
  async getBalapans(): Promise<Balapan[]> {
    try {
      const balapanRef = this.getBalapanRef();
      const q = query(balapanRef, orderBy("updatedAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Balapan)
      );
    } catch (error) {
      console.error("Error Get Balapans:", error);
      throw error;
    }
  },

  // update
  async updateBalapan(id: string, balapan: Partial<Balapan>) {
    try {
      const balapanRef = this.getBalapanRef();
      const docRef = doc(balapanRef, id);
      await updateDoc(docRef, {
        ...balapan,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error Update Balapan:", error);
      throw error;
    }
  },

  // delete
  async deleteBalapan(id: string) {
    try {
      const balapanRef = this.getBalapanRef();
      const docRef = doc(balapanRef, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error Delete Balapan:", error);
      throw error;
    }
  },

  // update status
  async updateStatus(id: string, status: boolean) {
    try {
      const balapanRef = this.getBalapanRef();
      const docRef = doc(balapanRef, id);
      await updateDoc(docRef, { status: status, updatedAt: Timestamp.now() });
    } catch (error) {
      console.error("Error Update Status:", error);
      throw error;
    }
  },
};
