import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { getObjective } from '../api';
import { ObjectiveState } from '../stores';
import { Objective } from '../types';

export const useObjective = (userId: string, objectiveId: string): Objective | null => {
  const [objective, setObjective] = useRecoilState(ObjectiveState);

  useEffect(() => {
    setObjective({isLoading: true, value: null})
    getObjective(userId, objectiveId).then( result => {
      if ( result.isSuccess()) {
        setObjective({isLoading: false, value: result.value as Objective})
      } else {
        setObjective({isLoading: false, value: null})
      }
    });
  }, [userId, objectiveId, setObjective]);

  return objective;
};

