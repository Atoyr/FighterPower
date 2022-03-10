import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseFirestore } from '../firebase';
import { useAuthContext } from "context/AuthProvider";
import { User, UserConverter} from 'data/user';

export const useUser = () : User => {
  const [user ,setUser ] = useState<User>(null!);
  const authState = useAuthContext().authState;
  
  useEffect(() => {
      if (authState.user != null) {
         const userId = authState.user.uid;
         const ref = doc( firebaseFirestore, "users", userId).withConverter(UserConverter);
         getDoc(ref).then(async (docSnap) => {
           if (docSnap.exists()) {
             setUser(docSnap.data());
           } else {
             const displayName = authState.user ? authState.user.displayName : "";
             const u = {
               id: userId,
               displayName: displayName,
             } as User;
             await setDoc(ref, u);
             setUser(u);
           }
         });
      }

  }, [authState]);


  return user;
};
