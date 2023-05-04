export type Objective = {
  __type : 'objective';
  id? : string;
  title : string;
  note : string;
  valid : boolean;
  status: string;
  createdAt? : Date;
  modifiedAt? : Date;
  tags? : string[];
  version : number;
};
