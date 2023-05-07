import { 
  doc,
  setDoc, 
  Transaction, 
  collection,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { Objective } from '../types';
import { ObjectiveConverter } from './Converter';
import { getObjective } from './getObjective';

export const setObjective = async (
  userId: string, 
  objective: Objective, 
  transaction?: Transaction): Promise<string> => {
  let newObjective: Objective;

  if((objective.id ?? "") === "") {
    newObjective = doc(collection(store, `users/${userId}/objectives`));
    objective.id = newObjective.id;
  } else {
    // 楽観ロック
    let refObjective: Objective;
    try {
      refObjective = await getObjective(userId, objective.id, transaction);
    } catch(error) {
      throw error;
    }
    if (refObjective.version != objective.version) {
      return new Error("objective update error");
    }
    newObjective = doc(store, `users/${userId}/objectives`, objective.id as string);
  }

  try {
    await (transaction ? 
          transaction.set(newObjective.withConverter(ObjectiveConverter), objective) 
          : setDoc(newObjective.withConverter(ObjectiveConverter), objective));
  } catch (error) {
    throw error;
  }
  return objective.id;
};

