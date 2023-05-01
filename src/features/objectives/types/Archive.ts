export type Archive = {
  __type : 'archive';
  id? : string;
  title : string;
  order : number;
  type? : string;
  note : string;
  createdAt? : Date;
  modifiedAt? : Date;
  version: number;
};

