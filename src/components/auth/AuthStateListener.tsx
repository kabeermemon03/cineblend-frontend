import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';

export const AuthStateListener = () => {
  const { setAuth, setLoading } = useAuthStore();

  useEffect(() => {
    // Set initial loading state to true
    setLoading(true);

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAuth({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        // User is signed out
        setAuth(null);
      }
      // Set loading to false once we have the initial state
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setAuth, setLoading]);

  return null; // This component doesn't render anything
};
