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
import { firebaseFirestore } from 'lib/firebase';
import { Result, Success, Failure } from './result'
import { updateGoalSheetModifiedAt } from 'data/goalSheet';

export type Goal = {
  __type : 'goal';
  id? : string;
  title : string;
  order: number;
  createdAt? : Date;
  modifiedAt? : Date;
};

export const newGoal : (title: string, order: number) => Goal = (title, order) => {
  return {
    title : title,
    order : order,
  } as Goal;
}

export const GoalConverter: FirestoreDataConverter<Goal> = {
  toFirestore: (goal) => {
    return {
      __type : 'goal',
      id : goal.id,
      title : goal.title,
      order : goal.order,
      createdAt : goal.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const goal = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      modifiedAt: data.modifiedAt?.toDate(),
    } as Goal;
    goal.id = snapshot.id;
    return goal;
  },
};

export const getGoals : (userId: string, goalSheetId: string) => Promise<Result<Array<Goal>, Error>> 
  = async (userId, goalSheetId) => {
  if (userId == "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (goalSheetId == "") {
    return new Failure(new RangeError("goalSheetId is empty."));
  }

  const ref = collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/goals`).withConverter(GoalConverter);
  const q = query( ref, orderBy("order"));
  const snapshot = await getDocs(q);
  let goals : Array<Goal> = [];
  snapshot.forEach((doc) => {
    goals.push(doc.data());
  });

  return new Success(goals);
};


export const getGoal: (userId: string, goalSheetId: string, goalId: string, transaction?: Transaction) => Promise<Result<Goal | null, Error>>
  = async (userId, goalSheetId, goalId, transaction?) => {
  if (userId == "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (goalSheetId == "") {
    return new Failure(new RangeError("goalSheetId is empty."));
  }
  if (goalId == "") {
    return new Success(null);
  }
  const ref = doc(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/goals`, goalId).withConverter(GoalConverter);
  const snapshot = await (transaction ? transaction.get(ref) : getDoc(ref))
  return new Success(snapshot.data() as Goal);
};

export const setGoal: (userId: string, goalSheetId: string, goal: Goal, transaction?: Transaction) => Promise<Result<string, Error>> = async (userId, goalSheetId, goal, transaction?) => {
  const ref = await getGoal( userId, goalSheetId, goal.id ?? "", transaction);
  let newGoalRef;
  if (ref.isFailure()) {
    return new Failure(ref.value);
  } else if (!ref.value) {
    newGoalRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/goals`));
    goal.id = newGoalRef.id;
  } else {
    newGoalRef = doc(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/goals`, goal.id as string);
  }
  await (transaction ? transaction.set( newGoalRef.withConverter(GoalConverter), goal) : setDoc(newGoalRef.withConverter(GoalConverter), goal))
  await updateGoalSheetModifiedAt(userId, goalSheetId);
  return new Success(goal.id as string);
};

