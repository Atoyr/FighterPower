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
  const q = query( ref, orderBy("order", "desc"));
  const snapshot = await getDocs(q);
  let goals : Array<Goal> = [];
  snapshot.forEach((doc) => {
    goals.push(doc.data());
  });

  return new Success(goals);
};


export const getGoal: (userId: string, goalSheetId: string, goalId: string, transaction?: Transaction) => { goal: (Goal | null), exists: boolean } 
  = (userId, goalSheetId, goalId, transaction?) => {
  if (userId == "" || goalSheetId == "" || goalId == "") {
    return {
      goal : null,
      exists : false,
    };
  }
  const ref = doc(firebaseFirestore, `user/${userId}/goalSheets/${goalSheetId}/goals`, goalId).withConverter(GoalConverter);
  let exists : boolean;
  let goal : (Goal | null);
  exists = false;
  goal = null;

  (transaction ? transaction.get(ref) : getDoc(ref))
  .then( tx => {
    exists = tx.exists();
    goal = tx.exists() ? tx.data() : null;
  });
  return {
    goal : goal,
    exists : exists,
  };
};

export const setGoal: (userId: string, goalSheetId: string, goal: Goal, transaction?: Transaction) => string = (userId, goalSheetId, goal, transaction?) => {
  const ref = getGoal( userId, goalSheetId, goal.id ?? "", transaction);
  let newGoalRef;
  if (!ref.exists) {
    newGoalRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/goals`));
    goal.id = newGoalRef.id;
  } else {
    newGoalRef = doc(collection(firebaseFirestore, `users/${userId}/goalSheets/${goalSheetId}/goals`, goal.id as string));
  }
  transaction ? transaction.set( newGoalRef.withConverter(GoalConverter), goal) : setDoc(newGoalRef.withConverter(GoalConverter), goal)
  return goal.id as string;
};

