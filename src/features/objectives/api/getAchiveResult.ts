import { 
  doc,
  getDoc,
  Transaction,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { DataNotFoundError } from '@/types'

import { AchiveResultConverter } from './Converter';
import { AchiveResult } from '../types';

export const getAchiveResult = async (
  userId: string, 
  objectiveId: string, 
  achiveId: string, 
  achiveResultId: string, 
  transaction?: Transaction): Promise<AchiveResult> => {
  if (userId === "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId === "") {
    throw new RangeError("objectiveId is empty.");
  }
  if (achiveId === "") {
    throw new RangeError("achiveId is empty.");
  }
  if (achiveResultId === "") {
    throw new RangeError("achiveResultId is empty.");
  }

  const ref = doc(store, `users/${userId}/objectives/${objectiveId}/achives/${achiveId}/results`, achiveResultId).withConverter(AchiveResultConverter);
  const snapshot = await (transaction ? transaction.get(ref) : getDoc(ref));
  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    throw new DataNotFoundError("achive result is not found.");
  }
};

