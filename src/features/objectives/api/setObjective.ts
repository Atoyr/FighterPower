import { 
  doc,
  setDoc, 
  Transaction, 
  collection,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { Objective } from '../types';
import { ObjectiveConverter } from './Converter';
import { getObjective } from './getObjective';

export const setObjective = async (
  userId: string, 
  objective: string, 
  transaction?: Transaction): Promise<Result<string, Error>> => {
  let objectiveId: string = objective.id ?? "";
  const refObjectiveResult = await getObjective(userId, objectiveId, transaction);

  // FIXME
  if ( refObjectiveResult.isFailure()) {
    return new Failure(refObjectiveResult.value);
  }

  const refObjective: Objective = refObjectiveResult.value as Objective;
  let newObjective: Objective;

  if(refObjective == null) {
    newObjective = doc(collection(store, `users/${userId}/objectives`));
    objective.id = newObjective.id;
    objectiveId = newObjective.id!;
  } else {
    // 楽観ロック
    if (refObjective.version != objective.version) {
      return new Failure(new Error("objective update error"));
    }
    newObjective = doc(store, `users/${userId}/objectives`, objectives.id as string);
  }

  try {
  await (transaction ? 
          transaction.set(newObjective.withConverter(ObjectiveConverter), objective) 
          : setDoc(newObjective.withConverter(ObjectiveConverter), objective));
  } catch (error) {
    return new Failure(error);
  }
  return new Success(objectiveId);
};

