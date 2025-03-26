import React, { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { User, AuthResponse } from "../types/authTypes";

type AccessTokenType = {
  access: string | undefined;
};

interface CurrentUserContextType {
  authToken: string | undefined;
  setAuthToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  callLogout: () => void;
  login: (token: string, userData: User) => void;
  }

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | undefined>(() => {
        try {
          return localStorage.getItem("authToken") || undefined;
        } catch (error) {
          console.error("Ошибка при чтении authToken из localStorage:", error);
          return undefined;
        }
      });


      const [user, setUser] = useState<User | undefined>(() => {
        try {
          const storedUser = localStorage.getItem("user");
          return storedUser ? JSON.parse(storedUser) : undefined;
        } catch (error) {
          console.error("Ошибка при разборе user из localStorage:", error);
          return undefined;
        }
      });

  const [loading, setLoading] = useState<boolean>(false);

  const login = (token: string, userData: User) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthToken(token);
    setUser(userData);
  };

  // Logout function
  const callLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthToken(undefined);
    setUser(undefined);
  };

  const isTokenValid = (token: string): boolean => {
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  // Проверка токена при загрузке
  useEffect(() => {
    if (authToken) {
      if (isTokenValid(authToken)) {
        setLoading(true);
      } else {
        callLogout(); // Токен недействителен, выход
      }
    } else {
      setLoading(true); // Нет токена, но загрузка завершена
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        user,
        setUser,
        loading,
        setLoading,
        callLogout,
        login
      }}
    >
      {loading ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthProvider;