import { runTransaction } from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { setAchive, setAchiveResult } from '../api';
import { Objective } from '../types';
import { getAchive } from './getAchive';

export type updateAchiveResultsProps = {
  userId: string, 
  objective: Objective, 
  achive: Achive , 
  achiveResults: Array<AchiveResults>
}

export const updateAchiveResults = async (
  {userId, objective, achive, achiveResults} : updateAchiveResultsProps ): Promise<Array<string>> => {
    return await runTransaction<string>(store, async (transaction: Transaction) => {
      try {
        if (achive.status === "open") {
          achive.status = "executing"
        }
        await setAchive(userId, objective.id, achive, transaction);

        const achiveResultIds : string[] = [];
        achiveResults.forEach(async value => {
          const id = await setAchiveResult(userId, objective.id, achive.id, value);
          achiveResultIds.push(id);
        })
        return achiveResultIds;
      } catch (error) {
        console.log(error);
      }
    });
  };

