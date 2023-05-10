export type Archive = {
  __type : 'archive';
  id? : string;
  title : string;
  order : number;
  type? : string;
  note : string;
  selectKeyResults: Array<string>;
  createdAt? : Date;
  modifiedAt? : Date;
  version: number;
};

