import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  AuthError,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
  updateEmail,
  updatePassword,
  User
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const authService = {
  // Create or update user in Firestore
  async syncUserToFirestore(user: User) {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          role: 'user'
        });
      } else {
        await setDoc(userRef, {
          displayName: user.displayName,
          photoURL: user.photoURL,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      }
    } catch (error) {
      console.error('Error syncing user to Firestore:', error);
    }
  },

  // Sign up a new user
  async signup(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await this.syncUserToFirestore(userCredential.user);
      
      // Trigger Email Notification for new signup
      try {
        const { adminService } = await import('./firebase-services');
        await adminService.emailService.send('new_signup', {
          userName: userCredential.user.displayName || 'New User',
          email: userCredential.user.email,
          role: 'client'
        });
      } catch (e) {
        console.error('Failed to send signup email:', e);
      }

      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  },

  // Log in an existing user
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await this.syncUserToFirestore(userCredential.user);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  },

  // Update Profile
  async updateUserProfile(displayName: string, photoURL?: string) {
    try {
      if (!auth.currentUser) throw new Error('No user logged in');
      await updateProfile(auth.currentUser, { displayName, photoURL });
      await this.syncUserToFirestore(auth.currentUser);
      return { user: auth.currentUser, error: null };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  },

  // Update Email
  async updateUserEmail(newEmail: string) {
    try {
      if (!auth.currentUser) throw new Error('No user logged in');
      await updateEmail(auth.currentUser, newEmail);
      await this.syncUserToFirestore(auth.currentUser);
      return { user: auth.currentUser, error: null };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  },

  // Update Password
  async updateUserPassword(newPassword: string) {
    try {
      if (!auth.currentUser) throw new Error('No user logged in');
      await updatePassword(auth.currentUser, newPassword);
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  },

  // Social Login: Google
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await this.syncUserToFirestore(result.user);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  },

  // Social Login: GitHub
  async loginWithGithub() {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await this.syncUserToFirestore(result.user);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  },

  // Social Login: Facebook
  async loginWithFacebook() {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await this.syncUserToFirestore(result.user);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  },

  // Logout
  async logout() {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  },

  // Get error message from Firebase Auth error
  getErrorMessage(error: AuthError): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Try logging in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password is too weak. It must be at least 6 characters.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Login popup was closed. Please try again.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email address but different sign-in credentials.';
      case 'auth/requires-recent-login':
        return 'Please log in again to update security settings.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  }
};
