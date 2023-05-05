import { atom } from 'recoil';

import { KeyResult } from '../types';

type KeyResultStateType = {
  isLoading: boolean;
  value: Objective | null;
};

export const KeyResultState = atom<KeyResultStateType>({
  key: 'objectives__KeyResult',
  default: {
    isLoading: false, 
    value: null, 
  }
});

