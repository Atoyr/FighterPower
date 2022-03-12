import { 
  FirestoreDataConverter, 
  doc,
  getDoc,
  setDoc,
  collection,
  serverTimestamp,
  Transaction,
} from 'firebase/firestore'
import { firebaseFirestore } from '../firebase';

export type Result = {
  __type : 'result';
  id? : string;
  title : string;
  no : number;
  type? : string;
  note : string;
  goalAchives? : string[];
  createdAt? : Date;
  modifiedAt? : Date;
};

export const newResult : (title: string, no: number, note: string) => Result = (title, no, note ) => {
  return {
    title : title,
    no : no,
    note : note,
  } as Result;
}

export const ResultConverter: FirestoreDataConverter<Result> = {
  toFirestore: (result) => {
    return {
      __type : 'result',
      id : result.id ?? "",
      title : result.title,
      no : result.no,
      note : result.note,
      createdAt : result.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const result = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      modifiedAt: data.modifiedAt?.toDate(),
    } as Result;
    result.id = snapshot.id;
    return result;
  },
};

export const getResult: (userId: string, goalSheetId: string, resultId: string, transaction?: Transaction) => { result: (Result | null), exists: boolean } = (userId, goalSheetId, resultId, transaction?) => {
  if (resultId == "") {
    return {
      result : null,
      exists : false,
    }
  }
  const ref = doc(firebaseFirestore, `user/${userId}/goalSheets/${goalSheetId}/results`, resultId).withConverter(ResultConverter);
  let exists : boolean;
  let result : (Result | null);
  exists = false;
  result = null;

  (transaction ? transaction.get(ref) : getDoc(ref))
  .then( tx => {
    exists = tx.exists();
    result = tx.exists() ? tx.data() : null;
  });
  return {
    result : result,
    exists : exists,
  }
};

export const setResult: (userId: string, goalSheetId: string, result: Result, transaction?: Transaction) => string = (userId, goalSheetId, result, transaction?) => {
  const ref = getResult( userId, goalSheetId, result.id ?? "", transaction);
  let newResultRef;
  if (!ref.exists) {
    newResultRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`));
    result.id = newResultRef.id;
  } else {
    newResultRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`, result.id as string));
  }
  transaction ? transaction.set( newResultRef.withConverter(ResultConverter), result) : setDoc(newResultRef.withConverter(ResultConverter), result)
  return result.id as string;
};



