import { atom } from 'recoil';

import { Objectives } from '../types';

export const  ObjectivesState = atom<Objectives | null>({
  key: 'objectives__Objectives',
  default: null, 
})


