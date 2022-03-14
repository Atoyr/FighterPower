import { 
  FirestoreDataConverter, 
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  serverTimestamp,
  Transaction,
  query,
  orderBy,
} from 'firebase/firestore'
import { firebaseFirestore } from '../firebase';
import { Result, Success, Failure } from './result'

export type GoalResult = {
  __type : 'goal_result';
  id? : string;
  title : string;
  order : number;
  type? : string;
  note : string;
  goalAchives? : string[];
  createdAt? : Date;
  modifiedAt? : Date;
};

export const newGoalResult : (title: string, order: number, note: string) => GoalResult = (title, order, note ) => {
  return {
    title : title,
    order : order,
    note : note,
  } as GoalResult;
}

export const GoalResultConverter: FirestoreDataConverter<GoalResult> = {
  toFirestore: (result) => {
    return {
      __type : 'result',
      id : result.id ?? "",
      title : result.title,
      order : result.order,
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

export const getGoalResults : (userId: string, goalSheetId: string) => Promise<Result<Array<GoalResult>, Error>> 
  = async (userId, goalSheetId) => {
  if (userId == "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (goalSheetId == "") {
    return new Failure(new RangeError("goalSheetId is empty."));
  }

  const ref = collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`).withConverter(GoalResultConverter);
  const q = query( ref, orderBy("order"));
  const snapshot = await getDocs(q);
  let goalResults : Array<GoalResult> = [];
  snapshot.forEach((doc) => {
    goalResults.push(doc.data());
  });

  return new Success(goalResults);
};

export const getGoalResult: (userId: string, goalSheetId: string, resultId: string, transaction?: Transaction) => { result: (GoalResult | null), exists: boolean } = (userId, goalSheetId, resultId, transaction?) => {
  if (resultId == "") {
    return {
      result : null,
      exists : false,
    }
  }
  const ref = doc(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`, resultId).withConverter(GoalResultConverter);
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
  transaction ? transaction.set( newGoalResultRef.withConverter(GoalResultConverter), goalResult) : setDoc(newGoalResultRef.withConverter(GoalResultConverter), goalResult)
  return goalResult.id as string;
};
