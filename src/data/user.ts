export type User = {
  __type : 'user';
  id? : string;
  displayName : string;
  createdAt? : Date;
  modifiedAt? : Date;
  iconUrl? : string;
  twitter? : string;
  discord? : string;
};
