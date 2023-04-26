export type KeyResult = {
  __type : 'key_result';
  id? : string;
  title : string;
  order : number;
  type? : string;
  note : string;
  achives : string[];
  createdAt? : Date;
  modifiedAt? : Date;
  version: number;
};
