import { 
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { Archive } from '../types';
import { ArchiveConverter } from './Converter';

export const getArchives = async (
  userId: string, 
  objectiveId: string, 
  keyResultId: string): Promise<Result<Array<Archive>, Error>> => {
  if (userId == "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (objectiveId == "") {
    return new Failure(new RangeError("objectiveId is empty."));
  }
  if (keyResultId == "") {
    return new Failure(new RangeError("objectiveId is empty."));
  }

  const ref = collection(store, `users/${userId}/objectives/${objectiveId}/keyResults/${keyResultId}/archives`).withConverter(ArchiveConverter);
  const snapshot = await getDocs(query(ref, orderBy("order")));
  const archives : Array<Archive> = [];
  snapshot.forEach((doc) => {
    archives.push(doc.data());
  });

  return new Success(keyResults);
};

