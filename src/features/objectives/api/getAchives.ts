import { 
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { Achive } from '../types';
import { AchiveConverter } from './Converter';

export const getAchives = async (
  userId: string, 
  objectiveId: string): Promise<Array<Achive>> => {
  if (userId == "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId == "") {
    throw new RangeError("objectiveId is empty.");
  }

  const ref = collection(store, `users/${userId}/objectives/${objectiveId}/achives`).withConverter(AchiveConverter);
  const snapshot = await getDocs(query(ref, orderBy("order")));
  const achives : Array<Achive> = [];
  snapshot.forEach((doc) => {
    achives.push(doc.data());
  });

  return achives;
};

