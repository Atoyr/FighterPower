import { useEffect, useState } from 'react';
import { GoalSheet, getGoalSheets } from 'data/goalSheet';

export const useGoalSheets = (userId: string): Array<GoalSheet> | null => {
  const [ goalSheets, setGoalSheets ] = useState<Array<GoalSheet> | null>(null);


  useEffect(() => {
    getGoalSheets(userId)
    .then( result => {
      if ( result.isSuccess()) {
        setGoalSheets(result.value as Array<GoalSheet>);
      } else {
        setGoalSheets([] as Array<GoalSheet>);
      }
    });
  }, [userId]);

  return goalSheets;
};

