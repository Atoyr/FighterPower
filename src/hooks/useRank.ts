import { useEffect } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { getRanks } from '@/api';
import { Rank } from '@/stores';

export const useRanks = () => {
  const [rank, setRank] = useRecoilState(Rank);
  
  useEffect(() => {
  }, [])
  return rank;
};
