import { 
  FirestoreDataConverter, 
  serverTimestamp,
  increment,
} from 'firebase/firestore'

import { Objective, KeyResult, Achive } from '../types';

export const ObjectiveConverter: FirestoreDataConverter<Objective> = {
  toFirestore: (objective) => {
    return {
      __type : 'objective',
      id : objective.id,
      title : objective.title,
      note : objective.note,
      valid : objective.valid,
      status : objective.status ?? "open",
      createdAt : objective.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
      tags : objective.tags ?? [], 
      version : (objective.version ?? 0) + 1, 
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const objective = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      modifiedAt: data.modifiedAt?.toDate(),
    } as Objective;
    objective.id = snapshot.id;
    return objective;
  },
};

export const KeyResultConverter: FirestoreDataConverter<KeyResult> = {
  toFirestore: (keyResult) => {
    return {
      __type : 'key_result',
      id : keyResult.id ?? "",
      title : keyResult.title,
      order : keyResult.order,
      memo : keyResult.memo,
      rank : keyResult.rank, 
      createdAt : keyResult.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
      version : (keyResult.version ?? 0) + 1, 
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const result = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      modifiedAt: data.modifiedAt?.toDate(),
    } as KeyResult;
    result.id = snapshot.id;
    return result;
  },
};

export const AchiveConverter: FirestoreDataConverter<Achive> = {
  toFirestore: (achive) => {
    return {
      __type : 'achive',
      id : achive.id ?? "",
      title : achive.title,
      order : achive.order,
      type : achive.type ?? "",
      note : achive.note,
      selectedKeyResults: achive.selectedKeyResults ?? [], 
      createdAt : achive.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
      version : (achive.version ?? 0) + 1, 
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const result = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      modifiedAt: data.modifiedAt?.toDate(),
    } as Achive;
    result.id = snapshot.id;
    return result;
  },
};

export const AchiveResultConverter: FirestoreDataConverter<AchiveResult> = {
  toFirestore: (achiveResult) => {
    return {
      __type : 'achive_result',
      id : achiveResult.id ?? "",
      selectedKeyResults: achiveResult.selectKeyResults ?? [], 
      achivedStatus: achiveResult.achivedStatus ?? [], 
      createdAt : achiveResult.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
      version : (achiveResult.version ?? 0) + 1, 
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const result = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      modifiedAt: data.modifiedAt?.toDate(),
    } as Achive;
    result.id = snapshot.id;
    return result;
  },
};
