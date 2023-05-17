export enum ObjectiveStatus {
  open = 'open', 
  executing = 'executing', 
  close = 'close', 
  abort = 'abort', 
};

export type ObjectiveStatusKeys = keyof typeof ObjectiveStatus;

