import { 
  doc,
  setDoc, 
  Transaction, 
  collection,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { Achive } from '../types';
import { AchiveConverter } from './Converter';
import { getAchive } from './getAchive';

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

  let achiveId : string = achive.id ?? "";
  let refAchive: Achive = null
  if (achiveId !== ""){
    try {
      refAchive = await getAchive(
        userId, 
        objectiveId, 
        achiveId, 
        transaction);
    } catch (error) {
      throw error;
    }
  }

  let newAchive: Achive;

  if(refAchive == null) {
    newAchive = doc(collection(store, `users/${userId}/objectives/${objectiveId}/achives`));
    achive.id = newAchive.id;
    achiveId = newAchive.id!;
  } else {
    // 楽観ロック
    if (refAchive.version != achive.version) {
      throw new Error("achive update error");
    }
    newAchive = doc(store, `users/${userId}/objectives/${objectiveId}/achives`, achiveId);
  }

  try {
    await (transaction ? 
            transaction.set(newAchive.withConverter(AchiveConverter), achive) 
            : setDoc(newAchive.withConverter(AchiveConverter), achive));
  } catch (error) {
    throw error;
  }
  return achiveId;
};

