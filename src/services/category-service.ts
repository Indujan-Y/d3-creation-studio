'use server';

import { getDatabase, ref, get } from 'firebase/database';
import { app } from '@/lib/firebase';
import _ from 'lodash';

export interface CategoryPhoto {
  url: string;
  aiHint: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  photos: CategoryPhoto[];
}

// Helper function to transform Firebase data into the Category structure
function transformCategory(fbCategory: any, id: string): Category {
  const photos = (fbCategory.photos || []).map((photoUrl: string) => ({
    url: `${photoUrl}&sz=w1920`, // Request a higher resolution image
    aiHint: 'category photo' 
  }));

  return {
    id: id,
    slug: _.kebabCase(fbCategory.title),
    title: fbCategory.title || 'Untitled Category',
    description: fbCategory.description || 'No description available.',
    thumbnail: `${fbCategory.thumbnail}&sz=w1000`, // Request a higher resolution thumbnail
    photos: photos,
  };
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const db = getDatabase(app);
    const categoriesRef = ref(db, 'categories');
    const snapshot = await get(categoriesRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => transformCategory(data[key], key));
    }
    return [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const db = getDatabase(app);
    const categoryRef = ref(db, `categories/${id}`);
    const snapshot = await get(categoryRef);

    if (snapshot.exists()) {
      return transformCategory(snapshot.val(), id);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching category by ID (${id}):`, error);
    return null;
  }
}
