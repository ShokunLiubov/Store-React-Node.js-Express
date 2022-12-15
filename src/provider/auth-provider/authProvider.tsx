import React, { createContext, PropsWithChildren, useState } from "react";
import {
  IContext,
  TypeUserState,
} from "../../shared/interfaces/customer.interface";

export const AuthContext = createContext({} as IContext);

const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<TypeUserState>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
