import { 
  FirestoreDataConverter, 
  serverTimestamp,
  Timestamp,
  doc,
  getDoc,
  getDocs,
  collection,
  Transaction,
  query,
  orderBy,
  limit,
  setDoc,
  updateDoc,
  increment,
} from 'firebase/firestore'
import { firebaseFirestore } from 'lib/firebase';
import { Result, Success, Failure } from './result'

export type GoalSheet = {
  __type : 'goal_sheet';
  id? : string;
  title : string;
  note : string;
  valid : boolean;
  createdAt? : Date;
  modifiedAt? : Date;
  tags? : string[];
  goalCount : number;
  resultCount : number;
  version : number;
};

export const newGoalSheet : (title: string, note: string) => GoalSheet = (title, note) => {
  return {
    title : title,
    note : note,
    valid : true,
    goalCount : 0,
    resultCount : 0,
    version : 0,
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
      version : increment(1.0),
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

export const getGoalSheets: (userId: string, from?: number, limit?: number) => Promise<Result<Array<GoalSheet>, Error>>
  = async (userId) => {
  if (userId == "") {
    return new Failure(new RangeError("userId is empty."));
  }

  const ref = collection(firebaseFirestore, `users/${userId}/goalSheets`).withConverter(GoalSheetConverter);
  // TODO LIMIT
  const q = query( ref, orderBy("modifiedAt", "desc"), limit(10));
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
    return new Success(null);
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
    if ((refGoalSheet as GoalSheet).version != goalSheet.version) {
      return new Failure(new Error("goalSheet update error"));
    }
    newGoalSheetRef = doc(firebaseFirestore, `users/${userId}/goalSheets`, goalSheet.id as string);
  } else {
    newGoalSheetRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets`));
    goalSheet.id = newGoalSheetRef.id;
    goalSheetId = newGoalSheetRef.id!;
  }
  await (transaction ? transaction.set(newGoalSheetRef.withConverter(GoalSheetConverter), goalSheet) : setDoc(newGoalSheetRef.withConverter(GoalSheetConverter), goalSheet))
  return new Success(goalSheetId);
};

export const updateGoalSheetModifiedAt: (userId: string, goalSheetId: string, at? : Date) => Promise<Result<Date, Error>>
  = async (userId, goalSheetId, at?) => {
  const refGoalSheetResult = await getGoalSheet( userId, goalSheetId);
  if ( refGoalSheetResult.isFailure()) {
    return new Failure(refGoalSheetResult.value)
  }

  if ( refGoalSheetResult.value == null) {
      return new Failure(new Error("goalSheet not found"));
  } else {
    const ref = doc(firebaseFirestore, `users/${userId}/goalSheets`, goalSheetId);
    const modifiedAt = at ?? serverTimestamp();
    await updateDoc(ref, { modifiedAt: modifiedAt});
    return new Success(new Date());
  }
};

export const inccermentGoalSheetGoalCount: (userId: string, goalSheetId: string, count? : number) => Promise<Result<number, Error>> 
  = (userId, goalSheetId, count?) => {
    return updateGoalSheetIncrementCount(userId, goalSheetId, "goal", count);
}

export const inccermentGoalSheetGoalResultCount: (userId: string, goalSheetId: string, count? : number) => Promise<Result<number, Error>> 
  = (userId, goalSheetId, count?) => {
    return updateGoalSheetIncrementCount(userId, goalSheetId, "goalresult", count);
}

export const updateGoalSheetIncrementCount: (userId: string, goalSheetId: string, type: string, count? : number) => Promise<Result<number, Error>>
  = async (userId, goalSheetId, type, count?) => {
  const refGoalSheetResult = await getGoalSheet( userId, goalSheetId);
  if ( refGoalSheetResult.isFailure()) {
    return new Failure(refGoalSheetResult.value)
  }

  if ( refGoalSheetResult.value == null) {
      return new Failure(new Error("goalSheet not found"));
  } else {
    const ref = doc(firebaseFirestore, `users/${userId}/goalSheets`, goalSheetId);
    switch ( type ) {
      case "goal": 
        await updateDoc(ref, { goalCount: increment(count ?? 1)});
        break;
      case "goalresult": 
        await updateDoc(ref, { goalResultCount: increment(count ?? 1)});
        break;
    }
    return new Success(count ?? 1);
  }
};
