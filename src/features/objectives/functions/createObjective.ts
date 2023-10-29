import { ObjectiveStatus } from '@/constants';
import { Objective } from '../types';

export const createObjective = (title: string, note: string) =>  {
  return {
    title : title,
    note : note,
    status: ObjectiveStatus.open, 
    valid : true,
    version : 0,
  };
}

