import { 
  doc,
  getDoc,
  Transaction,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { Goal } from '../types';
import { GoalConverter } from './Converter';

export type getGoalOptions = {
  userId: string;
  goalSheetId: string;
  goalId: string;
  transaction?: Transaction;
}

export const getGoal = async (options: getGoalOptions): Promise<Result<Goal | null, Error>> => {
    if (optinos.userId == "") {
      return new Failure(new RangeError("userId is empty."));
    }
    if (options.goalSheetId == "") {
      return new Failure(new RangeError("goalSheetId is empty."));
    }
    if (options.goalId == "") {
      return new Success(null);
    }
    const ref = doc(store, `users/${options.userId}/goalSheets/${options.goalSheetId}/goals`, options.goalId).withConverter(GoalConverter);
    const snapshot = await (options.transaction ? options.transaction.get(ref) : getDoc(ref))
    return new Success(snapshot.data() as Goal);
};
