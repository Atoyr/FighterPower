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
import { Goal, setGoal, GoalConverter } from './goal'
import { Result } from './result'

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
};

export const newGoalSheet : (title: string, note: string) => GoalSheet = (title, note) => {
  return {
    title : title,
    note : note,
    valid : true,
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

export const getGoalSheet: (userId: string, goalSheetId: string, transaction?: Transaction) => Promise<GoalSheet> = async (userId, goalSheetId, transaction?) => {
  if (goalSheetId == "") {
    return emptyGoalSheet();
  }
  const ref = doc(firebaseFirestore, `user/${userId}/goalSheets`, goalSheetId).withConverter(GoalSheetConverter);

  const snapshot = transaction ? await transaction.get(ref) : await getDoc(ref);
  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    return emptyGoalSheet();
  }
};

export const setGoalSheet: (userId: string, goalSheet: GoalSheet) => Promise<string> = async (userId: string, goalSheet: GoalSheet) => {
  let goalSheetId = goalSheet.id ?? "";
  await runTransaction(firebaseFirestore, async (transaction) => {
    const refGoalSheet = await getGoalSheet( userId, goalSheetId, transaction);
    let newGoalSheetRef;
    if ((refGoalSheet.id ?? "") == "" ) {
      newGoalSheetRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets`));
      goalSheet.id = newGoalSheetRef.id;
      goalSheetId = newGoalSheetRef.id;
    } else {
      if (refGoalSheet.modifiedAt && refGoalSheet.modifiedAt != goalSheet.modifiedAt) {
        console.log("goalSheet update error");
        return;
      }
      newGoalSheetRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets`, goalSheet.id as string));
    }
    await transaction.set(newGoalSheetRef.withConverter(GoalSheetConverter), goalSheet);

    if (goalSheet.goals) {
      goalSheet.goals.forEach(async v => {
        setGoal( userId, goalSheetId, v, transaction);
      });
    }
  });
  return goalSheetId;
};

