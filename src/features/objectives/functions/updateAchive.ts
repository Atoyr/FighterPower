import { runTransaction } from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { setAchive, setObjective, setAchiveResult } from '../api';
import { Objective } from '../types';
import { createAchiveResult } from './createAchiveResult';

export type updateAchiveProps = {
  userId: string, 
  objective: Objective, 
  achive: Achive 
}

export const updateAchive = async (
  {userId, objective, achive } : updateAchiveProps ): Promise<string> => {
    return await runTransaction<string>(store, async (transaction: Transaction) => {
      try {
        if (objective.status === "open") {
          objective.status = "executing"
        }
        const isNew = (achive.id ?? "") === "";
        const updateObjectivePromise = setObjective(userId, objective, transaction);
        const updateAchivePromise = setAchive(userId, objective.id, achive, transaction);
        const ret = await Promise.all([updateObjectivePromise, updateAchivePromise]);
        const achiveId = ret[1];
        if (isNew) {
          achive.selectedKeyResults.forEach(async value => {
            const achiveResult = createAchiveResult(1, value);
            await setAchiveResult(userId, objective.id, achiveId, achiveResult, transaction);
          })
        }

        return achiveId;
      } catch (error) {
        console.log(error);
      }
    });
  };
