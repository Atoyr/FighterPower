import { 
  doc,
  setDoc, 
  Transaction, 
  collection,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { KeyResult } from '../types';
import { KeyResultConverter } from './Converter';
import { getKeyResult } from './getKeyResult';

export const setKeyResult = async (
  userId: string, 
  objectiveId: string, 
  keyResult: keyResult, 
  transaction?: Transaction ): Promise<string> => {
  if (userId === "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId === "") {
    throw new RangeError("objectiveId is empty.");
  }

  let keyResultId : string = keyResult.id ?? "";
  let refKeyResult: KeyResult = null;
  if (keyResultId !== "") {
    // 存在チェック
    try {
      const refKeyResultResult = await getKeyResult(
        userId, 
        objectiveId, 
        keyResultId, 
        transaction);
      refKeyResult = refKeyResultResult.value as KeyResult;
    } catch(error) {
      throw error;
    }
  }

  let newKeyResult: KeyResult;

  if(refKeyResult == null) {
    newKeyResult = doc(collection(store, `users/${userId}/objectives/${objectiveId}/keyResults`));
    keyResult.id = newKeyResult.id;
    keyResultId = newKeyResult.id!;
  } else {
    // 楽観ロック
    if (refKeyResult.version != archive.version) {
      throw new Error("archive update error");
    }
    newKeyResult = doc(store, `users/${userId}/objectives/${objectiveId}/keyResults`, keyResult.id);
  }

  try {
    await (transaction ? 
            transaction.set(newKeyResult.withConverter(KeyResultConverter), keyResult) 
            : setDoc(newKeyResult.withConverter(KeyResultConverter), keyResult));
  } catch (error) {
    throw error;
  }
  return keyResultId;
};
