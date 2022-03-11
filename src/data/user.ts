import { 
  FirestoreDataConverter, 
  serverTimestamp
} from 'firebase/firestore'
import { User as FirebaseUser } from "firebase/auth"

export type User = {
  __type : 'user';
  id? : string;
  firebaseUser? : FirebaseUser | null;
  displayName : string;
  createdAt? : Date;
  modifiedAt? : Date;
  iconUrl? : string;
  twitter? : string;
  discord? : string;
};

export const UserConverter: FirestoreDataConverter<User> = {
  toFirestore: (user) => {
    return {
      __type : 'user',
      id : user.id,
      displayName : user.displayName,
      createdAt : user.createdAt ?? serverTimestamp(),
      modifiedAt : user.modifiedAt ?? serverTimestamp(),

      iconUrl : user.iconUrl ? user.iconUrl : null,
      twitter : user.twitter ? user.twitter : null,
      discord : user.discord ? user.discord : null,
    };
  },
  fromFirestore: (snapshot) => {
    console.log(snapshot)
    const data = snapshot.data();
    const user = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      modifiedAt: data.modifiedAt?.toDate(),
    } as User;
    user.id = snapshot.id;
    return user;
  },
};
