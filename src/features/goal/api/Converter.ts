import { 
  FirestoreDataConverter, 
  serverTimestamp,
} from 'firebase/firestore'

import { Goal, GoalResult } from '../types';

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

export const GoalResultConverter: FirestoreDataConverter<GoalResult> = {
  toFirestore: (result) => {
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
      version : result.version ,
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
