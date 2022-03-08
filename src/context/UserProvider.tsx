import * as React from "react";

import { useUser } from "hook/useUser"
import { User } from "data/user"

let UserContext = React.createContext<User>(null!);

function UserProvider({ children }: { children: React.ReactNode }) {
  let user = useUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

function useUserContext() {
  return React.useContext(UserContext);
}

export { UserProvider, useUserContext }
