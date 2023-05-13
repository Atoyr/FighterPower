import { runTransaction } from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { setAchive, setObjective } from '../api';
import { Objective } from '../types';
import { getAchive } from './getAchive';

export type updateAchiveProps = {
  userId: string, 
  objective: Objective, 
  achive: Achive 
}

export const updateAchive = async (
  {userId, objective, achive } : updateAchiveProps ): Promise<string> => {
    return await runTransaction<string>(store, async (transaction: Transaction) => {
      try {
        if (objective.type === "open") {
          objective.type = "executing"
        }
        const updateObjectivePromise = setObjective(userId, objective, transaction);
        const updateAchivePromise = setAchive(userId, objective.id, achive, transaction);

        const ret = await Promise.all([updateObjectivePromise, updateAchivePromise]);
        return ret[1];
      } catch (error) {
        console.log(error);
      }
    });
  };
