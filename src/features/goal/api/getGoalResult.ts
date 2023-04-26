import { 
  doc,
  getDoc,
  Transaction,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { GoalResult } from '../types';
import { GoalResultConverter } from './Converter';

export type getGoalResultOptions = {
  userId: string;
  goalSheetId: string;
  resultId: string;
  transaction?: Transaction;
}

export const getGoalResult = async (options: getGoalResultOptions): Promise<Result<GoalResult | null, Error>> => {
  if (options.userId == "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (options.goalSheetId == "") {
    return new Failure(new RangeError("goalSheetId is empty."));
  }
  if (options.resultId == "") {
    return new Success(null);
  }
  const ref = doc(store, `users/${options.userId}/goalSheets/${options.goalSheetId}/results`, options.resultId).withConverter(GoalResultConverter);
  const snapshot = await (options.transaction ? options.transaction.get(ref) : getDoc(ref))
  return new Success(snapshot.exists() ? snapshot.data() : null);
};

