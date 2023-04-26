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
  const refKeyResultResult = await getKeyResult(
    userId, 
    objectiveId, 
    keyResultId, 
    transaction);

  // FIXME
  if ( refKeyResultResult.isFailure()) {
    return new Failure(refKeyResultResult.value);
  }

  const refAcrhive: KeyResult = refKeyResultResult.value as KeyResult;
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

  // FIXME catch exception
  await (transaction ? 
          transaction.set(newKeyResult.withConverter(KeyResultConverter), keyResult) 
          : setDoc(newKeyResult.withConverter(KeyResultConverter), keyResult));
  return new Success(keyResultId);
};
