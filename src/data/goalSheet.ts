import { 
  FirestoreDataConverter, 
  serverTimestamp,
  doc,
  getDoc,
  getDocs,
  collection,
  Transaction,
  query,
  orderBy,
  limit,
  runTransaction,
  setDoc,
} from 'firebase/firestore'
import { firebaseFirestore } from '../firebase';
import { Goal, setGoal } from './goal'
import { GoalResult, setGoalResult } from './goalResult'
import { Result, Success, Failure } from './result'

export type GoalSheet = {
  __type : 'goal_sheet';
  id? : string;
  title : string;
  note : string;
  valid : boolean;
  createdAt? : Date;
  modifiedAt? : Date;
  goals? : Goal[]
  results? : GoalResult[]
  tags? : string[];
  goalCount : number;
  resultCount : number;
};

export const newGoalSheet : (title: string, note: string) => GoalSheet = (title, note) => {
  return {
    title : title,
    note : note,
    valid : true,
    goalCount : 0,
    resultCount : 0,
  } as GoalSheet;
}

export const GoalSheetConverter: FirestoreDataConverter<GoalSheet> = {
  toFirestore: (goalSheet) => {
    return {
      __type : 'goal_sheet',
      id : goalSheet.id,
      title : goalSheet.title,
      note : goalSheet.note,
      valid : goalSheet.valid,
      tags : goalSheet.tags ?? [],
      createdAt : goalSheet.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const goalSheet = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      modifiedAt: data.modifiedAt?.toDate(),
    } as GoalSheet;
    goalSheet.id = snapshot.id;
    return goalSheet;
  },
};

export const getGoalSheets: (userId: string) => Promise<Result<Array<GoalSheet>, Error>>
  = async (userId) => {
  if (userId == "") {
    return new Failure(new RangeError("userId is empty."));
  }

  const ref = collection(firebaseFirestore, `users/${userId}/goalSheets`).withConverter(GoalSheetConverter);
  // TODO LIMIT
  const q = query( ref, orderBy("modifiedAt"), limit(10));
  const snapshot = await getDocs(q);
  let goalSheets : Array<GoalSheet> = [];
  snapshot.forEach((doc) => {
    goalSheets.push(doc.data());
  });

  return new Success(goalSheets);
};

export const getGoalSheet: (userId: string, goalSheetId: string, transaction?: Transaction) => Promise<Result<(GoalSheet | null), Error>>
  = async (userId, goalSheetId, transaction?) => {
  if (userId == "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (goalSheetId == "") {
    return new Failure(new RangeError("goalSheetId is empty."));
  }

  const ref = doc(firebaseFirestore, `users/${userId}/goalSheets`, goalSheetId).withConverter(GoalSheetConverter);
  const snapshot = await (transaction ? transaction.get(ref) : getDoc(ref));
  return new Success(snapshot.exists() ? snapshot.data() : null);
};

export const setGoalSheet: (userId: string, goalSheet: GoalSheet, transaction?: Transaction) => Promise<Result<string,Error>>
  = async (userId, goalSheet, transaction?) => {
  let goalSheetId : string = goalSheet.id ?? "";
  const refGoalSheetResult = await getGoalSheet( userId, goalSheetId, transaction);
  if ( refGoalSheetResult.isFailure()) {
    return new Failure(refGoalSheetResult.value)
  }

  const refGoalSheet = refGoalSheetResult.value;
  let newGoalSheetRef;
  if (refGoalSheet != null) {
    if ((refGoalSheet as GoalSheet).modifiedAt && (refGoalSheet as GoalSheet).modifiedAt != goalSheet.modifiedAt) {
      return new Failure(new Error("goalSheet update error"));
    }
    newGoalSheetRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets`, goalSheet.id as string));
  } else {
    newGoalSheetRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets`));
    goalSheet.id = newGoalSheetRef.id;
    goalSheetId = newGoalSheetRef.id!;
  }
  await (transaction ? transaction.set(newGoalSheetRef.withConverter(GoalSheetConverter), goalSheet) : setDoc(newGoalSheetRef.withConverter(GoalSheetConverter), goalSheet))

  if (transaction) {
    if (goalSheet.goals) {
      goalSheet.goals.forEach(async v => {
        setGoal( userId, goalSheetId, v, transaction);
      });
    }

    if (goalSheet.results) {
      goalSheet.results.forEach(async v => {
        setGoalResult( userId, goalSheetId, v, transaction);
      });
    }
  }
  return new Success(goalSheetId);
};

