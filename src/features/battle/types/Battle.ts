export type Battle = {
  __type : 'battle';
  id? : string;
  myCharacter : string;
  yourName? : string;
  yourCharacter : string;
  result: string;
  note : string;
  archiveId?: string;
  createdAt? : Date;
  modifiedAt? : Date;
  version: number;
};


