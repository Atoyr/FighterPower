import { atom } from 'recoil';

import { ObjectiveKeyResults } from '../types';

export const  ObjectiveKeyResultsState = atom<ObjectiveKeyResults | null>({
  key: 'objectives__ObjectiveKeyResults',
  default: null, 
})

