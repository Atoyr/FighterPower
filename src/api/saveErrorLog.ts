import { 
  doc,
  setDoc, 
  collection,
} from 'firebase/firestore'

import { useAuth } from '@/hooks';
import { store } from '@/lib/firebase';

import { errorLogConverter } from './Converter';

export const saveErrorLog = async (error: Error) => {

  try {
    const authState = useAuth();
    const errorLogRef = doc(collection(store, 'errorLogs'));
    await setDoc(errorLogRef.withConverter(errorLogConverter), {
      message: error.message,
      stackTrace: error.stack,
      userId: authState?.user?.uid ?? '', 
    });
  } catch (error) {
    console.log(error);
  }
};
