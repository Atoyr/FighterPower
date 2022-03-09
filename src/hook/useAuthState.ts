import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, onSnapshot, collection } from 'firebase/firestore';
// import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseFirestore } from '../firebase';
import { UserConverter} from 'data/user';

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export const useAuthState = (): AuthState => {
  const [ AuthState, setAuthState ] = useState<AuthState>({ user: null, loading: true});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user != null) {
         const userId = user.uid;
         const docRef = doc(firebaseFirestore, "users", userId);
         getDoc(docRef).then((doc) => {
           if ( doc.exists()) {
             console.log("Document data:", doc.data());
           } else {
             console.log("No such document!");
           }
         });

         console.log(userId);
      }

      let authState = {
        user: user,
        loading: false,
      };
      setAuthState(authState);
    });
    return unsubscribe;
  }, [firebaseAuth]);

  return AuthState;
};
