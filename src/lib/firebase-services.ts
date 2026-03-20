import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

// CineBits (Service Requests)
export const cinebitsService = {
  create: async (data: any) => {
    return addDoc(collection(db, 'cinebits'), {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
  },
  
  getByUser: async (userId: string) => {
    const q = query(
      collection(db, 'cinebits'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

// Careers (Applications)
export const careersService = {
  submit: async (data: any) => {
    return addDoc(collection(db, 'careers'), {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
  }
};

// User Profile
export const userService = {
  getProfile: async (uid: string) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },
  
  updateProfile: async (uid: string, data: any) => {
    const docRef = doc(db, 'users', uid);
    return updateDoc(docRef, data);
  }
};

// Assets (Logos, Gallery)
export const assetsService = {
  getLogos: async () => {
    const snap = await getDocs(collection(db, 'logos'));
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  getGraphicDesignGallery: async () => {
    const snap = await getDocs(collection(db, 'graphic_design'));
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};