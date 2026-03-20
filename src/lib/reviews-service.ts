import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

// Define the Review data structure to match Firestore
export interface Review {
  id: string;
  name: string;
  role: string;
  review: string;
  imageUrl?: string;
  rating: number;
  order?: number;
}

const reviewsService = {
  async getAll(): Promise<Review[]> {
    try {
      const reviewsCollection = collection(db, 'reviews');
      
      // Fetch sorted by 'order' if the field exists, otherwise fetch unsorted
      let q;
      try {
        q = query(reviewsCollection, orderBy('order', 'asc'));
      } catch (e) {
        q = query(reviewsCollection);
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return [];
      }

      const reviews = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Anonymous Client',
          role: data.role || 'Valued Partner',
          review: data.review || '',
          imageUrl: data.imageUrl,
          rating: data.rating || 5,
          order: data.order ?? 999,
        } as Review;
      });

      // Perform a final sort in the frontend for stability
      return reviews.sort((a, b) => (a.order || 999) - (b.order || 999));

    } catch (error: any) {
      console.error("🔥 Firestore Error fetching reviews:", error);
      throw new Error("Failed to load reviews from the database.");
    }
  },
};

export default reviewsService;