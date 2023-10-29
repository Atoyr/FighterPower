import { 
  doc,
  setDoc, 
  Transaction, 
  collection,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { AchiveResult } from '../types';
import { AchiveResultConverter } from './Converter';
import { getAchiveResult } from './getAchiveResult';

export const setAchiveResult = async (
  userId: string, 
  objectiveId: string, 
  achiveId: string, 
  achiveResult: AchiveResult, 
  transaction?: Transaction ): Promise<string> => {
  if (userId === "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId === "") {
    throw new RangeError("objectiveId is empty.");
  }
  if (achiveId === "") {
    throw new RangeError("achiveId is empty.");
  }

  let achiveResultId : string = achiveResult.id ?? "";
  let refAchiveResult: AchiveResult = null
  if (achiveResultId !== ""){
    try {
      refAchiveResult = await getAchiveResult(
        userId, 
        objectiveId, 
        achiveId, 
        achiveResultId, 
        transaction);
    } catch (error) {
      throw error;
    }
  }

  let newAchiveResult: AchiveResult;

  if(refAchiveResult == null) {
    newAchiveResult = doc(collection(store, `users/${userId}/objectives/${objectiveId}/achives/${achiveId}/results`));
    achiveResult.id = newAchiveResult.id;
    achiveResultId = newAchiveResult.id!;
  } else {
    // 楽観ロック
    if (refAchiveResult.version != achiveResult.version) {
      throw new Error("achive update error");
    }
    newAchiveResult = doc(store, `users/${userId}/objectives/${objectiveId}/achives/${achiveId}/results`, achiveResultId);
  }

  try {
    await (transaction ? 
            transaction.set(newAchiveResult.withConverter(AchiveResultConverter), achiveResult) 
            : setDoc(newAchiveResult.withConverter(AchiveResultConverter), achiveResult));
  } catch (error) {
    throw error;
  }
  return achiveResultId;
};

