import { createContext, useState } from "react";

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <MyContext.Provider
      value={{
        sessionId,
        setSessionId,

        question,
        setQuestion,

        answer,
        setAnswer,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}