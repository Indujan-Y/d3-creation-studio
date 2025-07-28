
'use server';

import { getDatabase, ref, get } from 'firebase/database';
import { app } from '@/lib/firebase';
import {-l_} from 'lodash';

export interface AlbumImage {
  url: string;
  aiHint: string;
}

export interface Album {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  coverUrl: string;
  aiHint: string;
  images: AlbumImage[];
  gradient: string;
  date: string;
}

const gradients = [
  "gradient-emerald",
  "gradient-slate",
  "gradient-amber",
  "gradient-purple",
  "gradient-rose",
  "gradient-indigo"
];

// Helper function to transform Firebase data into the Album structure
function transformAlbum(fbAlbum: any, id: string, index: number): Album {
    const images = (fbAlbum.photos || []).map((photoUrl: string) => ({
        url: photoUrl,
        aiHint: 'album photo' 
    }));

    return {
        id: id,
        slug: _.kebabCase(fbAlbum.title),
        title: fbAlbum.title || 'Untitled Album',
        description: fbAlbum.description || 'No description available.',
        coverUrl: fbAlbum.thumbnail,
        images: images,
        date: fbAlbum.date,
        // Assign default/fallback values for fields not in Firebase
        category: 'Photography', 
        aiHint: 'photo album',
        gradient: gradients[index % gradients.length],
    };
}


export async function getAllAlbums(): Promise<Album[]> {
  try {
    const db = getDatabase(app);
    const albumsRef = ref(db, 'Albums');
    const snapshot = await get(albumsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key, index) => transformAlbum(data[key], key, index));
    }
    return [];
  } catch (error) {
    console.error("Error fetching all albums:", error);
    return [];
  }
}

export async function getAlbumById(id: string): Promise<Album | null> {
  try {
    const db = getDatabase(app);
    const albumRef = ref(db, `Albums/${id}`);
    const snapshot = await get(albumRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const allAlbums = await getAllAlbums();
      const albumIndex = allAlbums.findIndex(album => album.id === id);
      return transformAlbum(data, id, albumIndex);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching album by ID (${id}):`, error);
    return null;
  }
}
