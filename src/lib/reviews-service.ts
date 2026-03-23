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
      let reviewsCollection = collection(db, 'testimonials');
      let querySnapshot;
      
      try {
        const q = query(reviewsCollection, orderBy('order', 'asc'));
        querySnapshot = await getDocs(q);
      } catch (err: any) {
        querySnapshot = await getDocs(reviewsCollection);
      }

      if (querySnapshot.empty) {
        reviewsCollection = collection(db, 'reviews');
        try {
          const q = query(reviewsCollection, orderBy('order', 'asc'));
          querySnapshot = await getDocs(q);
        } catch (err: any) {
          querySnapshot = await getDocs(reviewsCollection);
        }
      }

      if (querySnapshot.empty) {
        return [];
      }

      const reviews = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Anonymous Client',
          role: data.role || 'Valued Partner',
          review: data.message || data.review || '',
          imageUrl: data.image || data.imageUrl,
          rating: data.rating || 5,
          order: data.order ?? 999,
        } as Review;
      });

      return reviews.sort((a, b) => (a.order || 999) - (b.order || 999));

    } catch (error: any) {
      // Keep errors for critical production monitoring, but clean up the verbose logs
      console.error("🔥 Firestore Error fetching reviews:", error.code || error.message);
      throw new Error("Failed to load reviews from the database.");
    }
  },
};

export default reviewsService;