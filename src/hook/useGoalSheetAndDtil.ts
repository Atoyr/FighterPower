import { useEffect, useState } from 'react';
import { GoalSheet, getGoalSheet } from 'data/goalSheet';
import { GoalResult, getGoalResults } from 'data/goalResult';
import { Goal, getGoals } from 'data/goal';

export interface GoalSheetAndDtil {
  goalSheet: GoalSheet | null;
  goals: Array<Goal>;
  goalResults: Array<GoalResult>;
}

export const useGoalSheetAndDtil = (userId: string, goalSheetId: string): GoalSheetAndDtil | null => {
  const [ goalSheetAndDtil, setGoalSheetAndDtil ] = useState<GoalSheetAndDtil>(null!);

  useEffect(() => {
    let goalSheet : GoalSheet | null = null;
    getGoalSheet(userId, goalSheetId)
    .then( async (result) => {
      if ( result.isSuccess()) {
        goalSheet = result.value as GoalSheet;
        let goals : Array<Goal> = [];
        let goalResults : Array<GoalResult> = [];
        let goalsResult = await getGoals(userId, goalSheetId);
        if (goalsResult.isSuccess()) {
          goals = goalsResult.value as Array<Goal>;
        }
        let goalResultsResult = await getGoalResults(userId, goalSheetId);
        if (goalResultsResult.isSuccess()) {
          goalResults = goalResultsResult.value as Array<GoalResult>;
        }
        setGoalSheetAndDtil({ 
          goalSheet: goalSheet,
          goals: goals,
          goalResults: goalResults});
      } else {
        setGoalSheetAndDtil({ 
          goalSheet: goalSheet,
          goals: [],
          goalResults: []});
      }
    });
  }, [userId, goalSheetId]);

  return goalSheetAndDtil;
};

