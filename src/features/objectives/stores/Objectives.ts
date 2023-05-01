import { atom } from 'recoil';

import { Objective } from '../types';

export const  ObjectivesState = atom<Array<Objectives> | null>({
  key: 'objectives__Objectives',
  default: null, 
})
