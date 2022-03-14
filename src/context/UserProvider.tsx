import * as React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useUser } from "hook/useUser"
import { User } from "data/user"

let UserContext = React.createContext<User>(null!);

function UserProvider({ children }: { children: React.ReactNode }) {
  let userState = useUser();
  return( 
    <UserContext.Provider value={userState.user}>
      {userState.loading ? 
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
          <CircularProgress color="inherit" />
        </Backdrop>
       : children}
    </UserContext.Provider>
  );
};

function useUserContext() {
  return React.useContext(UserContext);
}

export { UserProvider, useUserContext }
