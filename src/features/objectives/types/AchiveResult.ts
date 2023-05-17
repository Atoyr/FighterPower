export type AchiveResult = {
  __type : 'achive_result';
  id? : string;
  groupNo: number;
  selectedKeyResult: string;
  status: string;
  battleId?: string;
  createdAt? : Date;
  modifiedAt? : Date;
  version: number;
};
