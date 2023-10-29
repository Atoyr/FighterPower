import { 
  doc,
  getDoc,
  Transaction,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { DataNotFoundError } from '@/types'

import { AchiveConverter } from './Converter';
import { Achive } from '../types';

export const getAchive = async (
  userId: string, 
  objectiveId: string, 
  achiveId: string, 
  transaction?: Transaction): Promise<Achive> => {
  if (userId === "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId === "") {
    throw new RangeError("objectiveId is empty.");
  }
  if (achiveId === "") {
    throw new RangeError("achiveId is empty.");
  }

  const ref = doc(store, `users/${userId}/objectives/${objectiveId}/achives`, achiveId).withConverter(AchiveConverter);
  const snapshot = await (transaction ? transaction.get(ref) : getDoc(ref));
  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    throw new DataNotFoundError("achive is not found.");
  }
};
