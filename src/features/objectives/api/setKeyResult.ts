import { 
  doc,
  setDoc, 
  Transaction, 
  collection,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { KeyResult } from '../types';
import { KeyResultConverter } from './Converter';
import { getKeyResult } from './getKeyResult';

export const setKeyResult = async (
  userId: string, 
  objectiveId: string, 
  keyResult: keyResult, 
  transaction?: Transaction ): Promise<Result<string, Error>> => {
  if (userId === "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (objectiveId === "") {
    return new Failure(new RangeError("objectiveId is empty."));
  }

  let keyResultId : string = keyResult.id ?? "";
  let refKeyResult: KeyResult = null;
  if (keyResultId !== "") {
    // 存在チェック
    const refKeyResultResult = await getKeyResult(
      userId, 
      objectiveId, 
      keyResultId, 
      transaction);

    if ( refKeyResultResult.isFailure()) {
      return new Failure(refKeyResultResult.value);
    }
    refKeyResult = refKeyResultResult.value as KeyResult;
  }

  let newKeyResult: KeyResult;

  if(refKeyResult == null) {
    newKeyResult = doc(collection(store, `users/${userId}/objectives/${objectiveId}/keyResults`));
    keyResult.id = newKeyResult.id;
    keyResultId = newKeyResult.id!;
  } else {
    // 楽観ロック
    if (refKeyResult.version != archive.version) {
      return new Failure(new Error("archive update error"));
    }
    newKeyResult = doc(store, `users/${userId}/objectives/${objectiveId}/keyResults`, keyResult.id);
  }

  try {
    await (transaction ? 
            transaction.set(newKeyResult.withConverter(KeyResultConverter), keyResult) 
            : setDoc(newKeyResult.withConverter(KeyResultConverter), keyResult));
  } catch (error) {
    return new Failure(error);
  }
  return new Success(keyResultId);
};
