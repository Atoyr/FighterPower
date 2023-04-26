export type GoalResult = {
  __type : 'goal_result';
  id? : string;
  title : string;
  order : number;
  type? : string;
  note : string;
  goalAchives : string[];
  createdAt? : Date;
  modifiedAt? : Date;
  version: number;
};

