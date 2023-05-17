import { AchiveStatus } from '@/constants';
import { Achive } from '../types';

export const createAchive = () => {
  return {
    title : "",
    order : 0,
    note : "", 
    status : AchiveStatus.open, 
    version : 0, 
  } as Achive;
}

