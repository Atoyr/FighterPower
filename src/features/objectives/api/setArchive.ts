import { 
  doc,
  setDoc, 
  Transaction, 
  collection,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';

import { Archive } from '../types';
import { ArchiveConverter } from './Converter';
import { getArchive } from './getArchive';

export const setArchive = async (
  userId: string, 
  objectiveId: string, 
  archive: Archive, 
  transaction?: Transaction ): Promise<string> => {
  if (userId === "") {
    throw new RangeError("userId is empty.");
  }
  if (objectiveId === "") {
    throw new RangeError("objectiveId is empty.");
  }

  let archiveId : string = archive.id ?? "";
  let refArchive: Archive = null
  try {
    refArchive = await getArchive(
      userId, 
      objectiveId, 
      archiveId, 
      transaction);
  } catch (error) {
    throw error;
  }

  let newArchive: Archive;

  if(refArchive == null) {
    newArchive = doc(collection(store, `users/${userId}/objectives/${objectiveId}/archives`));
    archive.id = newArchive.id;
    archiveId = newArchive.id!;
  } else {
    // 楽観ロック
    if (refArchive.version != archive.version) {
      throw new Error("archive update error");
    }
    newArchive = doc(store, `users/${userId}/objectives/${objectiveId}/archives`, archiveId);
  }

  try {
    await (transaction ? 
            transaction.set(newArchive.withConverter(ArchiveConverter), archive) 
            : setDoc(newArchive.withConverter(ArchiveConverter), archive));
  } catch (error) {
    throw error;
  }
  return archiveId;
};
