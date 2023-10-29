import { 
  FirestoreDataConverter, 
  serverTimestamp,
  increment,
} from 'firebase/firestore'

export const errorLogConverter = {
  toFirestore: (errorLog) => {
    return {
      message: errorLog.message,
      stackTrace: errorLog.stackTrace, 
      userId: errorLog.userId, 
      timestamp: serverTimestamp(), 
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      message: data.message,
      stackTrace: data.stackTrace, 
      userId: data.userId ?? '', 
      timestamp: data.timestamp?.toDate(),
    };
  },
};
