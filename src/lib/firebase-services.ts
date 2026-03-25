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
  updateDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  limit
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
  
  getByUser: (userId: string, callback: (data: any[]) => void) => {
    const q = query(
      collection(db, 'cinebits'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
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
    return setDoc(docRef, data, { merge: true });
  }
};

// Contact Messages
export const contactService = {
  submit: async (data: any) => {
    return addDoc(collection(db, 'messages'), {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
    });
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

// Notifications
export const notificationService = {
  getUnreadCount: (userId: string, callback: (count: number) => void) => {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    return onSnapshot(q, (snap) => callback(snap.size));
  },

  getUserNotifications: (userId: string, callback: (notifications: any[]) => void) => {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  },

  markAsRead: async (notificationId: string) => {
    const docRef = doc(db, 'notifications', notificationId);
    return updateDoc(docRef, { read: true });
  },

  create: async (userId: string, title: string, message: string, type: string = 'info') => {
    return addDoc(collection(db, 'notifications'), {
      userId,
      title,
      message,
      type,
      read: false,
      timestamp: serverTimestamp()
    });
  },

  sendToAll: async (title: string, message: string, type: string = 'info') => {
    const usersSnap = await getDocs(collection(db, 'users'));
    const promises = usersSnap.docs.map(userDoc => 
      addDoc(collection(db, 'notifications'), {
        userId: userDoc.id,
        title,
        message,
        type,
        read: false,
        timestamp: serverTimestamp()
      })
    );
    return Promise.all(promises);
  }
};

// Admin Services
export const adminService = {
  getStats: (callback: (stats: any) => void) => {
    const unsubUsers = onSnapshot(collection(db, 'users'), (usersSnap) => {
      updateStats({ totalUsers: usersSnap.size });
    });
    
    const unsubCinebits = onSnapshot(collection(db, 'cinebits'), (cinebitsSnap) => {
      const active = cinebitsSnap.docs.filter(d => d.data().status !== 'completed').length;
      const completed = cinebitsSnap.docs.filter(d => d.data().status === 'completed').length;
      updateStats({ activeRequests: active, completedProjects: completed });
    });
    
    const unsubRevisions = onSnapshot(collection(db, 'revisions'), (revisionsSnap) => {
      const pending = revisionsSnap.docs.filter(d => d.data().status === 'requested').length;
      updateStats({ pendingRevisions: pending });
    });

    let currentStats = {
      totalUsers: 0,
      activeRequests: 0,
      pendingRevisions: 0,
      completedProjects: 0
    };

    const updateStats = (newData: any) => {
      currentStats = { ...currentStats, ...newData };
      callback(currentStats);
    };

    return () => {
      unsubUsers();
      unsubCinebits();
      unsubRevisions();
    };
  },

  getAllCinebits: (callback: (data: any[]) => void) => {
    const q = query(collection(db, 'cinebits'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  },

  updateCinebitStatus: async (id: string, status: string, userId: string, projectName: string) => {
    const docRef = doc(db, 'cinebits', id);
    await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
    
    await notificationService.create(
      userId,
      'Project Status Updated',
      `Your project "${projectName}" status has been updated to: ${status}`,
      'info'
    );
  },

  getAllUsers: (callback: (data: any[]) => void) => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  },

  updateUserRole: async (uid: string, role: 'admin' | 'client') => {
    const docRef = doc(db, 'users', uid);
    return updateDoc(docRef, { role });
  },

  // Testimonials Admin
  getAllTestimonials: (callback: (data: any[]) => void) => {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  },

  addTestimonial: async (data: any) => {
    return addDoc(collection(db, 'testimonials'), {
      ...data,
      createdAt: serverTimestamp()
    });
  },

  updateTestimonial: async (id: string, data: any) => {
    const docRef = doc(db, 'testimonials', id);
    return updateDoc(docRef, data);
  },

  deleteTestimonial: async (id: string) => {
    const docRef = doc(db, 'testimonials', id);
    return deleteDoc(docRef);
  },

  // Team Admin
  getAllTeam: (callback: (data: any[]) => void) => {
    const unsubFounders = onSnapshot(collection(db, 'team'), (foundersSnap) => {
      updateTeam(foundersSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), isFounder: true })), 'founders');
    });

    const unsubCore = onSnapshot(collection(db, 'teamMember'), (coreSnap) => {
      updateTeam(coreSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), isFounder: false })), 'core');
    });

    let teamMap: { [key: string]: any[] } = { founders: [], core: [] };

    const updateTeam = (data: any[], key: string) => {
      teamMap[key] = data;
      callback([...teamMap.founders, ...teamMap.core]);
    };

    return () => {
      unsubFounders();
      unsubCore();
    };
  },

  addTeamMember: async (data: any, isFounder: boolean) => {
    const col = isFounder ? 'team' : 'teamMember';
    return addDoc(collection(db, col), {
      ...data,
      createdAt: serverTimestamp()
    });
  },

  updateTeamMember: async (id: string, data: any, isFounder: boolean) => {
    const col = isFounder ? 'team' : 'teamMember';
    const docRef = doc(db, col, id);
    return updateDoc(docRef, data);
  },

  deleteTeamMember: async (id: string, isFounder: boolean) => {
    const col = isFounder ? 'team' : 'teamMember';
    const docRef = doc(db, col, id);
    return deleteDoc(docRef);
  },

  // Portfolio Admin
  getAllProjects: (callback: (data: any[]) => void) => {
    const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  },

  addProject: async (data: any) => {
    return addDoc(collection(db, 'portfolio'), {
      ...data,
      createdAt: serverTimestamp()
    });
  },

  updateProject: async (id: string, data: any) => {
    const docRef = doc(db, 'portfolio', id);
    return updateDoc(docRef, data);
  },

  deleteProject: async (id: string) => {
    const docRef = doc(db, 'portfolio', id);
    return deleteDoc(docRef);
  },

  // Revisions Admin
  getAllRevisions: (callback: (data: any[]) => void) => {
    const q = query(collection(db, 'revisions'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  },

  updateRevisionStatus: async (id: string, status: string, userId: string, projectTitle: string) => {
    const docRef = doc(db, 'revisions', id);
    await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
    
    await notificationService.create(
      userId,
      'Revision Status Updated',
      `Revision for "${projectTitle}" is now: ${status}`,
      'info'
    );
  },

  getRecentActivity: (callback: (data: any[]) => void) => {
    const cinebitsQuery = query(collection(db, 'cinebits'), orderBy('createdAt', 'desc'), limit(5));
    const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(5));
    const revisionsQuery = query(collection(db, 'revisions'), orderBy('createdAt', 'desc'), limit(5));

    const unsubscribeCinebits = onSnapshot(cinebitsQuery, (cinebitsSnap) => {
      const cinebits = cinebitsSnap.docs.map(d => ({ 
        id: d.id, 
        type: 'request', 
        title: `New request: ${d.data().serviceType}`, 
        user: d.data().userName, 
        date: d.data().createdAt 
      }));
      updateActivity(cinebits, 'cinebits');
    });

    const unsubscribeUsers = onSnapshot(usersQuery, (usersSnap) => {
      const users = usersSnap.docs.map(d => ({ 
        id: d.id, 
        type: 'user', 
        title: `New user joined: ${d.data().displayName}`, 
        user: d.data().displayName, 
        date: d.data().createdAt 
      }));
      updateActivity(users, 'users');
    });

    const unsubscribeRevisions = onSnapshot(revisionsQuery, (revisionsSnap) => {
      const revisions = revisionsSnap.docs.map(d => ({ 
        id: d.id, 
        type: 'revision', 
        title: `Revision requested for: ${d.data().projectTitle}`, 
        user: d.data().userName, 
        date: d.data().createdAt 
      }));
      updateActivity(revisions, 'revisions');
    });

    let activityMap: { [key: string]: any[] } = { cinebits: [], users: [], revisions: [] };

    const updateActivity = (data: any[], key: string) => {
      activityMap[key] = data;
      const combined = [
        ...activityMap.cinebits,
        ...activityMap.users,
        ...activityMap.revisions
      ]
      .filter(a => a.date)
      .sort((a, b) => b.date.toMillis() - a.date.toMillis())
      .slice(0, 10);
      callback(combined);
    };

    return () => {
      unsubscribeCinebits();
      unsubscribeUsers();
      unsubscribeRevisions();
    };
  },

  deleteUser: async (uid: string) => {
    const docRef = doc(db, 'users', uid);
    return deleteDoc(docRef);
  },

  // Deliverables / File Management
  getAllDeliverables: (callback: (data: any[]) => void) => {
    const q = query(collection(db, 'deliverables'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  },

  addDeliverable: async (data: any) => {
    const docRef = await addDoc(collection(db, 'deliverables'), {
      ...data,
      createdAt: serverTimestamp()
    });
    
    // Notify client
    await notificationService.create(
      data.userId,
      'New Deliverable Ready',
      `Files for project "${data.projectName}" are now available.`,
      'info'
    );
    
    return docRef;
  },

  deleteDeliverable: async (id: string) => {
    const docRef = doc(db, 'deliverables', id);
    return deleteDoc(docRef);
  },

  updateDeliverable: async (id: string, data: any) => {
    const docRef = doc(db, 'deliverables', id);
    return updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  },

  // Contact Messages Admin
  getAllMessages: (callback: (data: any[]) => void) => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  },

  updateMessageStatus: async (id: string, status: string) => {
    const docRef = doc(db, 'messages', id);
    return updateDoc(docRef, { status });
  },

  deleteMessage: async (id: string) => {
    const docRef = doc(db, 'messages', id);
    return deleteDoc(docRef);
  },

  // Email Notification Settings (Firestore-backed)
  getEmailSettings: async () => {
    const docRef = doc(db, 'settings', 'email_notifications');
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  },

  updateEmailSettings: async (settings: any) => {
    const docRef = doc(db, 'settings', 'email_notifications');
    return setDoc(docRef, { ...settings, updatedAt: serverTimestamp() }, { merge: true });
  },

  // Email Notification Services (Backend Integration)
  emailService: {
    send: async (event: string, data: any) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/notifications/send-email/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ event, ...data }),
        });
        return await response.json();
      } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
      }
    },

    getHistory: async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/notifications/email-history/`);
        return await response.json();
      } catch (error) {
        console.error('Failed to fetch email history:', error);
        return [];
      }
    },

    getSettings: async () => {
      const docRef = doc(db, 'settings', 'email_notifications');
      const snap = await getDoc(docRef);
      if (snap.exists()) return snap.data();
      
      // Default settings
      return {
        new_request: true,
        status_update: true,
        new_signup: true,
        revision_requested: true,
        recipients: ['admin@cineblend.com'],
      };
    },

    updateSettings: async (settings: any) => {
      const docRef = doc(db, 'settings', 'email_notifications');
      return setDoc(docRef, { ...settings, updatedAt: serverTimestamp() }, { merge: true });
    },

    resendEmail: async (historyId: string) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/notifications/resend-email/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ historyId }),
        });
        return await response.json();
      } catch (error) {
        console.error('Resending email failed:', error);
        throw error;
      }
    }
  }
};

export const revisionsService = {
  create: async (data: any) => {
    const docRef = await addDoc(collection(db, 'revisions'), {
      ...data,
      status: 'requested',
      createdAt: serverTimestamp(),
    });

    // Notify user of revision request receipt
    await notificationService.create(
      data.userId,
      'Revision Requested',
      `Revision for project "${data.projectTitle}" has been received and is being reviewed.`,
      'info'
    );

    return docRef;
  },

  getByRequest: async (requestId: string) => {
    const q = query(
      collection(db, 'revisions'),
      where('requestId', '==', requestId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};