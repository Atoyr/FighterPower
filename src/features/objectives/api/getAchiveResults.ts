import { 
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { AchiveResult } from '../types';
import { AchiveResultConverter } from './Converter';

export const getAchiveResults = async (
  userId: string, 
  objectiveId: string, 
  achiveId: string): Promise<Array<AchiveResult>> => {
  if (userId == "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId == "") {
    throw new RangeError("objectiveId is empty.");
  }
  if (achiveId == "") {
    throw new RangeError("achiveId is empty.");
  }

  const ref = collection(store, `users/${userId}/objectives/${objectiveId}/achives/${achiveId}/results`).withConverter(AchiveResultConverter);
  const snapshot = await getDocs(query(ref, orderBy("groupNo")));
  const achives : Array<Achive> = [];
  snapshot.forEach((doc) => {
    achives.push(doc.data());
  });

  return achives;
};


