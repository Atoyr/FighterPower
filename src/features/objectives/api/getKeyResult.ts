import { 
  doc,
  getDoc,
  Transaction,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { KeyResultConverter } from './Converter';
import { KeyResult } from '../types';

export const getKeyResult = async (
  userId: string, 
  objectiveId: string, 
  keyResultId: string, 
  transaction?: Transaction): Promise<Result<(KeyResult | null), Error>> => {
  if (userId === "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (objectiveId === "") {
    return new Failure(new RangeError("objectiveId is empty."));
  }
  if (keyResultId === "") {
    return new Failure(new RangeError("keyResultId is empty."));
  }

  const ref = doc(store, `users/${userId}/objectives/${objectiveId}/keyResults`, keyResultId).withConverter(KeyResultConverter);
  const snapshot = await (transaction ? transaction.get(ref) : getDoc(ref));
  return new Success(snapshot.exists() ? snapshot.data() : null);
};


