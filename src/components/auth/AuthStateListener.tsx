import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuthStore } from '@/store/authStore';

export const AuthStateListener = () => {
  const { setAuth, setLoading, setOnboardingStatus } = useAuthStore();

  useEffect(() => {
    // Set initial loading state to true
    setLoading(true);

    let unsubscribeFirestore: (() => void) | null = null;

    // Subscribe to auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in - subscribe to their Firestore document for profile updates
        const userRef = doc(db, 'users', user.uid);
        
        unsubscribeFirestore = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setAuth({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              onboardingCompleted: userData.onboardingCompleted || false,
              role: userData.role || 'client',
            });
          } else {
            // Document might not exist yet if sync hasn't happened
            setAuth({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              onboardingCompleted: false,
              role: 'client',
            });
          }
        }, (error) => {
          console.error("Auth Profile Sync Error:", error);
          setLoading(false);
        });
      } else {
        // User is signed out
        if (unsubscribeFirestore) unsubscribeFirestore();
        setAuth(null);
      }
      // Set loading to false once we have the initial state
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, [setAuth, setLoading, setOnboardingStatus]);

  return null; // This component doesn't render anything
};
