export type KeyResult = {
  __type : 'key_result';
  id? : string;
  title : string;
  order : number;
  memo : string;
  rank : string;
  createdAt? : Date;
  modifiedAt? : Date;
  version: number;
};
