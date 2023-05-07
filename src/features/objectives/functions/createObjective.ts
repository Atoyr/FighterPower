import { Objective } from '../types';

export const createObjective = (title: string, note: string) =>  {
  return {
    title : title,
    note : note,
    status: "open", 
    valid : true,
    version : 0,
  };
}

