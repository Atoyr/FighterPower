import { 
  doc,
  setDoc, 
  Transaction, 
  collection,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { Goal } from '../types';
import { GoalConverter } from './Converter';
import { getGoal } from './getGoal';

export type setGoalOptions = {
  userId: string;
  goalSheetId: string;
  goal: Goal;
  transaction?: Transaction
}

export const setGoal = async ({ userId, goalSheetId, goal, transaction? }: setGoalOptions): Promise<Result<string, Error>> => {
  const ref = await getGoal( {userId, goalSheetId, goal.id ?? "", transaction} );
  let newGoalRef;
  if (ref.isFailure()) {
    return new Failure(ref.value);
  } else if (!ref.value) {
    newGoalRef = doc(collection(store, `users/${userId}/goalSheets/${goalSheetId}/goals`));
    goal.id = newGoalRef.id;
  } else {
    newGoalRef = doc(store, `users/${userId}/goalSheets/${goalSheetId}/goals`, goal.id as string);
  }
  await (transaction ? transaction.set( newGoalRef.withConverter(GoalConverter), goal) : setDoc(newGoalRef.withConverter(GoalConverter), goal))

  // FIXME Goal Sheet inccerment
  if (ref.value == null) {
    await inccermentGoalSheetGoalCount(userId, goalSheetId);
  }
  await updateGoalSheetModifiedAt(userId, goalSheetId);
  return new Success(goal.id as string);
};
