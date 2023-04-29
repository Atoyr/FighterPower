import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { getObjectives } from '../api';
import { ObjectivesState } from '../stores';
import { Objectives } from '../types';

export const useObjectives = (userId: string): Array<Objectives> | null => {
  const [objectives, setObjectives] = useRecoilState(ObjectivesState);

  useEffect(() => {
    getObjectives(userId).then( result => {
      if ( result.isSuccess()) {
        setObjectives(result.value as Array<Objective>);
      } else {
        setObjectives([] as Array<Objective>);
      }
    });
  }, []);

  return objectives;
};
