import { 
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { GoalResult } from '../types';
import { GoalResultConverter } from './Converter';

export type getGoalResultsOptions = {
  userId: string;
  goalSheetId: string;
}

export const getGoalResults = async (options: getGoalResultsOptions): Promise<Result<Array<GoalResult>, Error>> => {
  if (options.userId == "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (options.goalSheetId == "") {
    return new Failure(new RangeError("goalSheetId is empty."));
  }

  const ref = collection(store, `users/${options.userId}/goalSheets/${options.goalSheetId}/results`).withConverter(GoalResultConverter);
  const q = query( ref, orderBy("order"));
  const snapshot = await getDocs(q);
  const goalResults : Array<GoalResult> = [];
  snapshot.forEach((doc) => {
    goalResults.push(doc.data());
  });

  return new Success(goalResults);
};

