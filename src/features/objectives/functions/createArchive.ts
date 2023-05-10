import { Archive } from '../types';

export const createArchive = () => {
  return {
    title : "",
    order : 0,
    note : "", 
    version : 0, 
  } as Archive;
}

