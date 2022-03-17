import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseFirestore } from 'lib/firebase';
import { useAuthContext } from "context/AuthProvider";
import { User, UserConverter} from 'data/user';

export interface UserState {
  user: User;
  loading: boolean;
}

export const useUser = () : UserState => {
  const emptyUser = {
    id: "",
    displayName: "",
  } as User;
  const [ userState, setUserState ] = useState<UserState>({ user: emptyUser, loading: true});
  const authState = useAuthContext().authState;
  
  useEffect(() => {
      if (authState.user != null) {
         const userId = authState.user.uid;
         const ref = doc( firebaseFirestore, "users", userId).withConverter(UserConverter);
         getDoc(ref).then(async (docSnap) => {
           if (docSnap.exists()) {
             let userState = {
               user: docSnap.data(),
               loading: false,
             }
             setUserState(userState);
           } else {
             const displayName = authState.user ? authState.user.displayName : "";
             const u = {
               id: userId,
               displayName: displayName,
             } as User;
             await setDoc(ref, u);
             let userState = {
               user: u,
               loading: false,
             }
             setUserState(userState);
           }
         });
      } else {
        let userState = {
          user: emptyUser,
          loading: false,
        }
        setUserState(userState);
      }
  }, [authState]);

  return userState;
};
