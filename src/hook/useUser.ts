import { useEffect, useState } from 'react';
import { User } from "data/user"

export const useUser = (): User => {
  const [ User, setUser ] = useState<User>(null!);
  return User;
};

