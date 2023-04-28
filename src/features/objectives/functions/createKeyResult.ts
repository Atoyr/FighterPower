import { KeyResult } from '../types';

export const createKeyResult = (title: string, order: number) => {
  return {
    title : title,
    order : order,
  } as KeyResult;
}
