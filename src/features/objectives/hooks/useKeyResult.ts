import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { getKeyResult } from '../api';
import { KeyResultState } from '../stores';
import { KeyResult } from '../types';

export const useKeyResult = (userId: string, objectiveId: string, keyResultId: string): KeyResult | null => {
  const [keyResult, setKeyResult] = useRecoilState(KeyResultState);

  useEffect(() => {
    setKeyResult({isLoading: true, value: null});
    getKeyResult(userId, objectiveId, keyResultId).then( result => {
      if ( result.isSuccess()) {
        setKeyResult({isLoading: false, value: result.value as KeyResult});
      } else {
        setKeyResult({isLoading: false, value: null});
      }
    });
  }, [userId, objectiveId, keyResultId, setKeyResult]);

  return keyResult;
};


