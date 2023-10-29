import { 
  doc,
  getDoc,
  Transaction,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { DataNotFoundError } from '@/types'

import { ObjectiveConverter } from './Converter';
import { Objective } from '../types';

export const getObjective = async (
  userId: string, 
  objectiveId: string, 
  transaction?: Transaction): Promise<Objective> => {
  if (userId === "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId === "") {
    throw new RangeError("objectiveId is empty.");
  }

  const ref = doc(store, `users/${userId}/objectives`, objectiveId).withConverter(ObjectiveConverter);
  const snapshot = await (transaction ? transaction.get(ref) : getDoc(ref));
  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    throw new DataNotFoundError("objective is not found.");
  }
};

