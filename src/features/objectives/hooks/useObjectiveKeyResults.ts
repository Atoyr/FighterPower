import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { getObjective, getKeyResults, getArchives } from '../api';
import { ObjectiveKeyResultsState } from '../stores';
import { ObjectiveKeyResults } from '../types';

export const useObjectiveKeyResults = (userId: string, objectiveId: string): ObjectiveKeyResults | null => {
  const [objectiveKeyResults, setObjectiveKeyResults] = useRecoilState(ObjectiveKeyResultsState);

  useEffect(() => {
    Promise.all([getObjective(userId, objectiveId), getKeyResults(userId, objectiveId), getArchives(userId, objectiveId)])
    .then(([objectiveResult, keyResultsResult, archivesResult]) =>
    {
      if(objectiveResult.isSuccess() && objectiveResult.value){
        const keyResults = keyResultsResult.isSuccess() ? keyResultsResult.value : [];
        const archives = archivesResult.isSuccess() ? archivesResult.value : [];
        setObjectiveKeyResults( {
          id: objectiveResult.value.id, 
          objective: objectiveResult.value, 
          keyResults: keyResults, 
          archives: archives
        });
      } else {
        setObjectiveKeyResults( {
          objective: null, 
          keyResults: [], 
          archives: [], 
        });
      }
    })
  }, [userId, objectiveId])

  return objectiveKeyResults;
};

