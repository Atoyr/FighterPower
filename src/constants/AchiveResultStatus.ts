export enum AchiveResultStatus {
  success = 'success', 
  failure = 'failure', 
  outside = 'outside', 
  nochance = 'nochance', 
  none = '', 
};

export type AchiveResultStatusKeys = keyof typeof AchiveResultStatus;

