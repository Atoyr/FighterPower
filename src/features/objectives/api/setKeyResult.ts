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
  const refKeyResultResult = await getKeyResult(
    userId, 
    objectiveId, 
    keyResult.id, 
    transaction);

  // FIXME
  if ( refKeyResultResult.isFailure()) {
    return new Failure(refKeyResultResult.value);
  }

  const refAcrhive: KeyResult = refKeyResultResult.value as KeyResult;
  let newKeyResult: KeyResult;

  if(refKeyResult == null) {
    newKeyResult = doc(collection(store, `users/${userId}/objectives/${objectiveId}/keyResults`));
    archive.id = newKeyResult.id;
    archiveId = newKeyResult.id!;
  } else {
    // 楽観ロック
    if (refKeyResult.version != archive.version) {
      return new Failure(new Error("archive update error"));
    }
    newKeyResult = doc(store, `users/${userId}/objectives/${objectiveId}/keyResults`, keyResult.id as string);
  }

  // FIXME catch exception
  await (transaction ? 
          transaction.set(newKeyResult.withConverter(KeyResultConverter), archive) 
          : setDoc(newKeyResult.withConverter(KeyResultConverter), archive));
  return new Success(archiveId);
};
