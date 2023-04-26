import { 
  doc,
  getDoc,
  Transaction,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { ObjectiveConverter } from './Converter';
import { Objective } from '../types';

export const getObjective = async (
  userId: string, 
  objectiveId: string, 
  transaction?: Transaction): Promise<Result<(Objective | null), Error>> => {
  if (userId === "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (objectiveId === "") {
    return new Success(null);
  }

  const ref = doc(store, `users/${userId}/objectives`, objectiveId).withConverter(ObjectiveConverter);
  const snapshot = await (transaction ? transaction.get(ref) : getDoc(ref));
  return new Success(snapshot.exists() ? snapshot.data() : null);
};

