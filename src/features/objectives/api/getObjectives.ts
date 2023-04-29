import { 
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { Objective } from '../types';
import { ObjectiveConverter } from './Converter';

export const getObjectives = async (userId: string): Promise<Result<Array<Objective>, Error>> => {
  if (userId === "") {
    return new Failure(new RangeError("userId is empty."));
  }

  console.log(`users/${userId}/objectives`);
  const ref = collection(store, `users/${userId}/objectives`).withConverter(ObjectiveConverter);
  const snapshot = await getDocs(query( ref, orderBy("modifiedAt")));
  const objectives : Array<Objective> = [];
  snapshot.forEach((doc) => {
    objectives.push(doc.data());
  });

  return new Success(objectives);
};


