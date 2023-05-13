export type AchiveResult = {
  __type : 'achive_task';
  id? : string;
  selectedKeyResults: Array<string>;
  achivedStatus: Array<string>;
  createdAt? : Date;
  modifiedAt? : Date;
  version: number;
};


