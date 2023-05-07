import { 
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { Archive } from '../types';
import { ArchiveConverter } from './Converter';

export const getArchives = async (
  userId: string, 
  objectiveId: string): Promise<Array<Archive>> => {
  if (userId == "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId == "") {
    throw new RangeError("objectiveId is empty.");
  }

  const ref = collection(store, `users/${userId}/objectives/${objectiveId}/archives`).withConverter(ArchiveConverter);
  const snapshot = await getDocs(query(ref, orderBy("order")));
  const archives : Array<Archive> = [];
  snapshot.forEach((doc) => {
    archives.push(doc.data());
  });

  return archives;
};

