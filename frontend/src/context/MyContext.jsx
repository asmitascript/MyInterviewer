import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Authentication state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          console.log("Authenticated user:", data.user);

          setUser(data.user);
          setSessionExpired(false);
        } else if (response.status === 401) {
          // User is not authenticated
          setUser(null);

          // Tell the app that authentication failed
          setSessionExpired(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <MyContext.Provider
      value={{
        sessionId,
        setSessionId,

        question,
        setQuestion,

        answer,
        setAnswer,

        user,
        setUser,

        loading,

        sessionExpired,
        setSessionExpired,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}