import { atom } from 'recoil';

import { Rank } from '@/types';

export const Rank = atom<Rank>({
  key: 'Rank',
  default: {
    s: 90, 
    a: 80, 
    b: 70, 
    c: 60, 
    d: 50, 
  }, 
})

