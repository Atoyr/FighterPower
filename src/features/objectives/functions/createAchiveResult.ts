import { AchiveResult } from '../types';

export const createAchiveResult = (
  groupNo: number, 
  selectedKeyResult: string) => {
  return {
    groupNo : groupNo,
    selectedKeyResult : selectedKeyResult, 
    status : "", 
    version : 0, 
  } as AchiveResult;
}


