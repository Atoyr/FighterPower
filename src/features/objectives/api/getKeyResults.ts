import { 
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { KeyResult } from '../types';
import { KeyResultConverter } from './Converter';

export const getKeyResults = async (
  userId: string, 
  objectiveId: string): Array<KeyResult> => {
  if (userId == "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId == "") {
    throw new RangeError("objectiveId is empty.");
  }

  const ref = collection(store, `users/${userId}/objectives/${objectiveId}/keyResults`).withConverter(KeyResultConverter);
  const snapshot = await getDocs(query( ref, orderBy("order")));
  const keyResults : Array<KeyResult> = [];
  snapshot.forEach((doc) => {
    keyResults.push(doc.data());
  });

  return keyResults;
};

