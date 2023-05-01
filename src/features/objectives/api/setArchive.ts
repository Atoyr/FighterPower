import { 
  doc,
  setDoc, 
  Transaction, 
  collection,
} from 'firebase/firestore'

import { store } from '@/lib/firebase';
import { Result, Success, Failure } from '@/types';

import { Archive } from '../types';
import { ArchiveConverter } from './Converter';
import { getArchive } from './getArchive';

export const setArchive = async (
  userId: string, 
  objectiveId: string, 
  archive: Archive, 
  transaction?: Transaction ): Promise<Result<string, Error>> => {
  if (userId === "") {
    return new Failure(new RangeError("userId is empty."));
  }
  if (objectiveId === "") {
    return new Failure(new RangeError("objectiveId is empty."));
  }

  let archiveId : string = archive.id ?? "";
  const refArchiveResult = await getArchive(
    userId, 
    objectiveId, 
    archiveId, 
    transaction);

  if ( refArchiveResult.isFailure()) {
    return new Failure(refArchiveResult.value);
  }

  const refArchive: Archive = refAcrhiveResult.value as Archive;
  let newArchive: Archive;

  if(refArchive == null) {
    newArchive = doc(collection(store, `users/${userId}/objectives/${objectiveId}/archives`));
    archive.id = newArchive.id;
    archiveId = newArchive.id!;
  } else {
    // 楽観ロック
    if (refArchive.version != archive.version) {
      return new Failure(new Error("archive update error"));
    }
    newArchive = doc(store, `users/${userId}/objectives/${objectiveId}/archives`, archiveId);
  }

  try {
    await (transaction ? 
            transaction.set(newArchive.withConverter(ArchiveConverter), archive) 
            : setDoc(newArchive.withConverter(ArchiveConverter), archive));
  } catch (error) {
    return new Failure(error);
  }
  return new Success(archiveId);
};
