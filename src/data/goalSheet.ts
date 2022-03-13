import { 
  FirestoreDataConverter, 
  serverTimestamp,
  doc,
  getDoc,
  Transaction,
  runTransaction,
  setDoc,
  collection,
} from 'firebase/firestore'
import { firebaseFirestore } from '../firebase';
import { Goal, setGoal } from './goal'
import { Result, setResult } from './result'

export type GoalSheet = {
  __type : 'goal_sheet';
  id? : string;
  title : string;
  note : string;
  valid : boolean;
  createdAt? : Date;
  modifiedAt? : Date;
  goals? : Goal[]
  results? : Result[]
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
    console.log(snapshot)
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

function emptyGoalSheet(): GoalSheet {
  return newGoalSheet("", "");
}

export const getGoalSheet: (userId: string, goalSheetId: string, transaction?: Transaction) => { goalSheet : (GoalSheet | null), exists : boolean } 
  = (userId, goalSheetId, transaction?) => {
  if (goalSheetId == "") {
    return {
      goalSheet : null,
      exists : false,
    };
  }
  const ref = doc(firebaseFirestore, `user/${userId}/goalSheets`, goalSheetId).withConverter(GoalSheetConverter);
  let goalSheet : ( GoalSheet | null) = null;
  let exists : boolean = false;
  (transaction ? transaction.get(ref) : getDoc(ref))
  .then((tx) => {
    exists = tx.exists();
    goalSheet = tx.exists() ? tx.data() : null;
  });
  return {
    goalSheet : goalSheet,
    exists : exists,
  };
};

export const setGoalSheet: (userId: string, goalSheet: GoalSheet, transaction?: Transaction) => string = (userId, goalSheet, transaction?) => {
  let goalSheetId : string = goalSheet.id ?? "";
  const refGoalSheet = getGoalSheet( userId, goalSheetId, transaction);
  let newGoalSheetRef;
  if (refGoalSheet.exists) {
    if ((refGoalSheet.goalSheet as GoalSheet).modifiedAt && (refGoalSheet.goalSheet as GoalSheet).modifiedAt != goalSheet.modifiedAt) {
      console.log("goalSheet update error");
      return "";
    }
    newGoalSheetRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets`, goalSheet.id as string));
  } else {
    newGoalSheetRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets`));
    goalSheet.id = newGoalSheetRef.id;
    goalSheetId = newGoalSheetRef.id!;
  }
  (transaction ? transaction.set(newGoalSheetRef.withConverter(GoalSheetConverter), goalSheet) : setDoc(newGoalSheetRef.withConverter(GoalSheetConverter), goalSheet))

  if (transaction) {
    if (goalSheet.goals) {
      goalSheet.goals.forEach(async v => {
        setGoal( userId, goalSheetId, v, transaction);
      });
    }

    if (goalSheet.results) {
      goalSheet.results.forEach(async v => {
        setResult( userId, goalSheetId, v, transaction);
      });
    }
  }
  return goalSheetId;
};

