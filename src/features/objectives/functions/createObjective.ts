import { Objective } from '../types';

export const createObjective = (title: string, note: string) =>  {
  return {
    title : title,
    note : note,
    valid : true,
    version : 0,
  } as Objective;
}


