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

export type GoalResult = {
  __type : 'goal_result';
  id? : string;
  title : string;
  no : number;
  type? : string;
  note : string;
  goalAchives? : string[];
  createdAt? : Date;
  modifiedAt? : Date;
};

export const newGoalResult : (title: string, no: number, note: string) => GoalResult = (title, no, note ) => {
  return {
    title : title,
    no : no,
    note : note,
  } as GoalResult;
}

export const ResultConverter: FirestoreDataConverter<GoalResult> = {
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
    } as GoalResult;
    result.id = snapshot.id;
    return result;
  },
};

export const getGoalResult: (userId: string, goalSheetId: string, resultId: string, transaction?: Transaction) => { result: (GoalResult | null), exists: boolean } = (userId, goalSheetId, resultId, transaction?) => {
  if (resultId == "") {
    return {
      result : null,
      exists : false,
    }
  }
  const ref = doc(firebaseFirestore, `user/${userId}/goalSheets/${goalSheetId}/results`, resultId).withConverter(ResultConverter);
  let exists : boolean;
  let result : (GoalResult | null);
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

export const setGoalResult: (userId: string, goalSheetId: string, goalResult: GoalResult, transaction?: Transaction) => string = (userId, goalSheetId, goalResult, transaction?) => {
  const ref = getGoalResult( userId, goalSheetId, goalResult.id ?? "", transaction);
  let newGoalResultRef;
  if (!ref.exists) {
    newGoalResultRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`));
    goalResult.id = newGoalResultRef.id;
  } else {
    newGoalResultRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`, goalResult.id as string));
  }
  transaction ? transaction.set( newGoalResultRef.withConverter(ResultConverter), goalResult) : setDoc(newGoalResultRef.withConverter(ResultConverter), goalResult)
  return goalResult.id as string;
};



