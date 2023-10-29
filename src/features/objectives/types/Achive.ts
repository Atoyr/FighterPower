export type Achive = {
  __type : 'achive';
  id? : string;
  title : string;
  order : number;
  type? : string;
  note : string;
  status : string;
  selectedKeyResults: Array<string>;
  createdAt? : Date;
  modifiedAt? : Date;
  version: number;
};

