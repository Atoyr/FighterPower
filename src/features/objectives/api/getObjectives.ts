import { 
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';

import { store } from '@/lib/firebase';

import { Objective } from '../types';
import { ObjectiveConverter } from './Converter';

export const getObjectives = async (userId: string): Promise<Array<Objective>> => {
  if (userId === "") {
    throw new RangeError("userId is empty.");
  }

  const ref = collection(store, `users/${userId}/objectives`).withConverter(ObjectiveConverter);
  const snapshot = await getDocs(query( ref, orderBy("modifiedAt")));
  const objectives : Array<Objective> = [];
  snapshot.forEach((doc) => {
    objectives.push(doc.data());
  });

  return objectives;
};


