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
  increment,
} from 'firebase/firestore'
import { firebaseFirestore } from 'lib/firebase';
import { Result, Success, Failure } from './result';
import { updateGoalSheetModifiedAt, inccermentGoalSheetGoalResultCount } from 'data/goalSheet';

export type GoalResult = {
  __type : 'goal_result';
  id? : string;
  title : string;
  order : number;
  type? : string;
  note : string;
  goalAchives : string[];
  createdAt? : Date;
  modifiedAt? : Date;
  version: number;
};

export const newGoalResult : (title: string, order: number, note: string) => GoalResult = (title, order, note ) => {
  return {
    title : title,
    order : order,
    note : note,
  } as GoalResult;
}

export const goalAchiveValue: (key: string) => string = (key) => {
  switch(key) {
    case "success":
      return "成功";
    case "failure":
      return "失敗";
    case "outside":
      return "意識外";
    case "nochance":
      return "機会無";
    default:
      return "";
  };
}

export const goalTypeValue: (key: string) => string = (key) => {
  switch(key) {
    case "battle":
      return "実戦";
    case "training":
      return "トレモ";
    default:
      return "";
  };
}

export const GoalResultConverter: FirestoreDataConverter<GoalResult> = {
  toFirestore: (result) => {
    console.log(result);
    return {
      __type : 'result',
      id : result.id ?? "",
      title : result.title,
      order : result.order,
      note : result.note,
      type : result.type ?? "",
      createdAt : result.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
      goalAchives: result.goalAchives,
      version : increment(1.0),
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

export const getGoalResult: (userId: string, goalSheetId: string, resultId: string, transaction?: Transaction) => Promise<Result<GoalResult | null, Error>>
  = async (userId, goalSheetId, resultId, transaction?) => {
  if (userId == "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (goalSheetId == "") {
    return new Failure(new RangeError("goalSheetId is empty."));
  }
  if (resultId == "") {
    return new Success(null);
  }
  const ref = doc(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`, resultId).withConverter(GoalResultConverter);
  const snapshot = await (transaction ? transaction.get(ref) : getDoc(ref))
  return new Success(snapshot.exists() ? snapshot.data() : null);
};

export const setGoalResult: (userId: string, goalSheetId: string, goalResult: GoalResult, transaction?: Transaction) => Promise<Result<string, Error>>
  = async (userId, goalSheetId, goalResult, transaction?) => {
  let result = await getGoalResult( userId, goalSheetId, goalResult.id ?? "", transaction);
  let newGoalResultRef;
  if (result.isFailure()) {
    return new Failure(result.value);
  } else if (result.value != null) {
    newGoalResultRef = doc(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`, goalResult.id as string);
  } else {
    newGoalResultRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/results`));
    goalResult.id = newGoalResultRef.id;
  }
  await (transaction ? transaction.set( newGoalResultRef.withConverter(GoalResultConverter), goalResult) : setDoc(newGoalResultRef.withConverter(GoalResultConverter), goalResult));
  if (result.value == null) {
    await inccermentGoalSheetGoalResultCount(userId, goalSheetId);
  }
  await updateGoalSheetModifiedAt(userId, goalSheetId);
  return new Success(goalResult.id as string);
};
