import { 
  doc,
  getDoc,
  Transaction,
} from 'firebase/firestore'


import { store } from '@/lib/firebase';
import { DataNotFoundError } from '@/types'

import { KeyResultConverter } from './Converter';
import { KeyResult } from '../types';

export const getKeyResult = async (
  userId: string, 
  objectiveId: string, 
  keyResultId: string, 
  transaction?: Transaction): Promise<KeyResult> => {
  if (userId === "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId === "") {
    throw new RangeError("objectiveId is empty.");
  }
  if (keyResultId === "") {
    throw new RangeError("keyResultId is empty.");
  }

  const ref = doc(store, `users/${userId}/objectives/${objectiveId}/keyResults`, keyResultId).withConverter(KeyResultConverter);
  const snapshot = await (transaction ? transaction.get(ref) : getDoc(ref));
  if (snapshot.exists()) {
      return snapshot.data();
  } else {
    throw new DataNotFoundError("KeyResult is not found.");
  }
};


