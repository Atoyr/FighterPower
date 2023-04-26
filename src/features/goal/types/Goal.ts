export type Goal = {
  __type : 'goal';
  id? : string;
  title : string;
  order: number;
  createdAt? : Date;
  modifiedAt? : Date;
};
