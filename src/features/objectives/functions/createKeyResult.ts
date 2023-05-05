import { KeyResult } from '../types';

export const createKeyResult = () => {
  return {
    title : "",
    order : 0,
    note : "", 
    rank : 3, 
    version : 0, 
  } as KeyResult;
}
