import { useEffect, useState } from 'react';
import { GoalSheet, getGoalSheet } from 'data/goalSheet';

export const useGoalSheet = (userId: string, goalSheetId: string): GoalSheet | null => {
  const [ goalSheet, setGoalSheet ] = useState<GoalSheet | null>(null);

  useEffect(() => {
    getGoalSheet(userId, goalSheetId)
    .then( result => {
      if ( result.isSuccess()) {
        setGoalSheet(result.value as GoalSheet | null);
      } else {
        setGoalSheet(null);
      }
    });
  }, [userId, goalSheetId]);

  return goalSheet;
};

