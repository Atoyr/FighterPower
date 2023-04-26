import { 
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { Goal } from '../types';
import { GoalConverter } from './Converter';

export type getGoalsOptions = {
  userId: string;
  goalSheetId: string;
}

export const getGoals = async (options: getGoalsOptions): Promise<Result<Array<Goal>, Error>> => {
    if (options.userId == "") {
      return new Failure(new RangeError("userId is empty."));
    }
    if (options.goalSheetId == "") {
      return new Failure(new RangeError("goalSheetId is empty."));
    }

    const ref = collection(store, `users/${options.userId}/goalSheets/${options.goalSheetId}/goals`).withConverter(GoalConverter);
    const q = query( ref, orderBy("order"));
    const snapshot = await getDocs(q);
    const goals : Array<Goal> = [];
    snapshot.forEach((doc) => {
      goals.push(doc.data());
    });

  return new Success(goals);
};

