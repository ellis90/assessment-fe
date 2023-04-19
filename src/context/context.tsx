import React, {createContext, Dispatch, ReactNode, SetStateAction, useState} from 'react';
import {UserModel} from "../model/user";

export interface IContext {
  children: ReactNode
}

const action: Dispatch<SetStateAction<UserModel|null>> = () => {}
const ContextUserData = createContext<UserModel | null >(null);
const ContextUserDispatcher = createContext<Dispatch<SetStateAction<UserModel|null>> >(action);

function UserProvider({ children }: IContext) {
  const [state, setState] = useState<UserModel | null>(null);

  return (
    <ContextUserData.Provider value={state}>
      <ContextUserDispatcher.Provider value={setState}>
        {children}
      </ContextUserDispatcher.Provider>
    </ContextUserData.Provider>
  );
}

export { UserProvider, ContextUserData, ContextUserDispatcher };
