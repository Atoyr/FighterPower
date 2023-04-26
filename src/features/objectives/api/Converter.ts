import { 
  FirestoreDataConverter, 
  serverTimestamp,
  increment,
} from 'firebase/firestore'

import { Objective, KeyResult, Archive } from '../types';

export const ObjectiveConverter: FirestoreDataConverter<Objective> = {
  toFirestore: (objective) => {
    return {
      __type : 'objective',
      id : objective.id,
      title : objective.title,
      createdAt : objective.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
      version : increment(1.0),
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
      type : keyResult.type ?? "",
      note : keyResult.note,
      achives: keyResult.achives,
      createdAt : keyResult.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
      version : keyResult.version ,
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

export const ArchiveConverter: FirestoreDataConverter<Archive> = {
  toFirestore: (archive) => {
    return {
      __type : 'archive',
      id : archive.id ?? "",
      title : archive.title,
      order : archive.order,
      type : archive.type ?? "",
      note : archive.note,
      createdAt : archive.createdAt ?? serverTimestamp(),
      modifiedAt : serverTimestamp(),
      goalAchives: archive.goalAchives,
      version : archive.version ,
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const result = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      modifiedAt: data.modifiedAt?.toDate(),
    } as Archive;
    result.id = snapshot.id;
    return result;
  },
};

