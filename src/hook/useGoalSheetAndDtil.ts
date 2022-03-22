import { useEffect, useState } from 'react';
import { GoalSheet, getGoalSheet } from 'data/goalSheet';
import { GoalResult, getGoalResults } from 'data/goalResult';
import { Goal, getGoals } from 'data/goal';

export interface GoalSheetAndDtil {
  goalSheet: GoalSheet | null;
  goals: Array<Goal>;
  goalResults: Array<GoalResult>;
  isLoading: boolean;
}

export const useGoalSheetAndDtil = (userId: string, goalSheetId: string, version: number): GoalSheetAndDtil => {
  const [ goalSheetAndDtil, setGoalSheetAndDtil ] = useState<GoalSheetAndDtil>({
    goalSheet: null,
    goals: [],
    goalResults: [],
    isLoading: true
  });

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
          goalResults: goalResults,
          isLoading: false});
      } else {
        setGoalSheetAndDtil({ 
          goalSheet: goalSheet,
          goals: [],
          goalResults: [],
          isLoading: false});
      }
    })
    .catch((e) => {
        setGoalSheetAndDtil({ 
          goalSheet: goalSheet,
          goals: [],
          goalResults: [],
          isLoading: false});
    });
  }, [userId, goalSheetId, version]);

  return goalSheetAndDtil;
};

