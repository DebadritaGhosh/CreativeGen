import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkUserAuthStatusAPI } from "../apis/users/usersApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState("");

  const { isError, isLoading, data, isSuccess } = useQuery({
    queryFn: checkUserAuthStatusAPI,
    queryKey: ["checkAuth"],
  });

  useEffect(() => {
    if(isSuccess){
        setIsAuthenticated(data);
    }
  }, [data]);

  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{isAuthenticated, isError, isLoading, isSuccess, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
    return useContext(AuthContext);
}
