import { 
  doc,
  getDoc,
  Transaction,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { DataNotFoundError } from '@/types'

import { ArchiveConverter } from './Converter';
import { Archive } from '../types';

export const getArchive = async (
  userId: string, 
  objectiveId: string, 
  archiveId: string, 
  transaction?: Transaction): Promise<Archive> => {
  if (userId === "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId === "") {
    throw new RangeError("objectiveId is empty.");
  }
  if (archiveId === "") {
    throw new RangeError("archiveId is empty.");
  }

  const ref = doc(store, `users/${userId}/objectives/${objectiveId}/archives`, archiveId).withConverter(ArchiveConverter);
  const snapshot = await (transaction ? transaction.get(ref) : getDoc(ref));
  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    throw new DataNotFoundError("archive is not found.");
  }
};
