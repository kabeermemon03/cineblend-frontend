import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Define the Team Member data structure
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imgURL: string; // ✅ Matches Firestore field name exactly
  bio: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  order?: number;
}

// Helper to map Firestore docs to TeamMember objects
const mapDocToMember = (doc: any): TeamMember => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name || 'Unknown Member',
    role: data.role || 'Staff',
    imgURL: data.imgURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    bio: data.bio || '',
    socialLinks: data.socialLinks || {},
    order: data.order ?? 999
  };
};

// Service to fetch team members from Firestore
const teamService = {
  // 1. Fetch Founders from 'team' collection
  async getFounders(): Promise<TeamMember[]> {
    try {
      const teamCollection = collection(db, 'team');
      const querySnapshot = await getDocs(teamCollection);
      
      if (querySnapshot.empty) return [];

      const members = querySnapshot.docs.map(mapDocToMember);
      return members.sort((a, b) => (a.order || 999) - (b.order || 999)).slice(0, 2);
    } catch (error: any) {
      console.error("🔥 Firestore Error (Founders):", error);
      throw new Error(error.message || "Failed to fetch founders.");
    }
  },

  // 2. Fetch Core Team from 'teamMember' collection
  async getCoreTeam(): Promise<TeamMember[]> {
    try {
      const teamCollection = collection(db, 'teamMember');
      const querySnapshot = await getDocs(teamCollection);
      
      if (querySnapshot.empty) return [];

      const members = querySnapshot.docs.map(mapDocToMember);
      return members.sort((a, b) => (a.order || 999) - (b.order || 999));
    } catch (error: any) {
      console.error("🔥 Firestore Error (Core Team):", error);
      throw new Error(error.message || "Failed to fetch core team.");
    }
  },

  // 3. Fetch Single Member by ID (checks both collections)
  async getById(id: string): Promise<TeamMember | null> {
    try {
      // Try 'team' collection first (Founders)
      const founderRef = doc(db, 'team', id);
      const founderSnap = await getDoc(founderRef);
      
      if (founderSnap.exists()) {
        return mapDocToMember(founderSnap);
      }

      // Try 'teamMember' collection (Core Team)
      const memberRef = doc(db, 'teamMember', id);
      const memberSnap = await getDoc(memberRef);
      
      if (memberSnap.exists()) {
        return mapDocToMember(memberSnap);
      }

      return null;
    } catch (error: any) {
      console.error("🔥 Firestore Error (GetById):", error);
      throw new Error(error.message || "Failed to fetch team member profile.");
    }
  },

  // Keep original getAll for compatibility if needed elsewhere
  async getAll(): Promise<TeamMember[]> {
    try {
      const founders = await this.getFounders();
      const coreTeam = await this.getCoreTeam();
      return [...founders, ...coreTeam];
    } catch (error) {
      return [];
    }
  }
};

export default teamService;
