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
    achive.id = newAchive.id;
    achiveId = newAchive.id!;
  } else {
    // 楽観ロック
    if (refAchive.version != achive.version) {
      throw new Error("achive update error");
    }
    newAchive = doc(store, `users/${userId}/objectives/${objectiveId}/achives/${achiveId}/results`, achiveResultId);
  }

  try {
    await (transaction ? 
            transaction.set(newAchive.withConverter(AchiveResultConverter), achiveResult) 
            : setDoc(newAchive.withConverter(AchiveResultConverter), achiveResult));
  } catch (error) {
    throw error;
  }
  return achiveResultId;
};

