import { createContext, useContext, useReducer } from "react";
export const StateContext = createContext();

export function StateProvider({ reducer, initialState, children }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

// pull information from the data layer
export const useStateValue = () => useContext(StateContext);
