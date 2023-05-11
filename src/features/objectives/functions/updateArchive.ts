import { runTransaction } from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { setArchive, setObjective } from '../api';
import { Objective } from '../types';
import { getArchive } from './getArchive';

export type updateArchiveProps = {
  userId: string, 
  objective: Objective, 
  archive: Archive 
}

export const updateArchive = async (
  {userId, objective, archive } : updateArchiveProps ): Promise<string> => {
    await runTransaction(store, async (transaction: Transaction) => {
      try {
        if (objective.type === "open") {
          objective.type = "executing"
        }
        const updateObjectivePromise = setObjective(userId, objective, transaction);
        const updateArchivePromise = setArchive(userId, objective.id, archive, transaction);

        const ret = await Promise.all([updateObjectivePromise, updateArchivePromise]);
        return ret[1];
      } catch (error) {
        console.log(error);
      }
    });
  };
