export type RankValue = 1 | 2 | 3| 4 | 5 ;

export enum RankValues {
  D = 1, 
  C, 
  B, 
  A, 
  S, 
};

export type RankValuesKeys = keyof typeof RankValues;
