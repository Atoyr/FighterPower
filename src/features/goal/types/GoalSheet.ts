export type GoalSheet = {
  __type : 'goal_sheet';
  id? : string;
  title : string;
  note : string;
  valid : boolean;
  createdAt? : Date;
  modifiedAt? : Date;
  tags? : string[];
  goalCount : number;
  resultCount : number;
  version : number;
};

