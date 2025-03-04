import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types";
import { useAuthCheck } from "../hooks/useCheckAuth";
import useGetUserProfile from "../hooks/api/useGetUserProfile";
import useLogout from "../hooks/api/useLogout";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isSuccessUser, setIsSuccessUser] = useState(false);
  const [accessTokenState, setAccessTokenState] = useState<string | null>(null);
  const { isAuthenticated } = useAuthCheck();
  const { logoutUser } = useLogout();
  const {
    user: fetchedUser,
    error,
    isLoading: isFetchedUserLoading,
    isSuccess: isFetchedUser,
  } = useGetUserProfile();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        setAccessTokenState(accessToken);
      }
    }
  }, []);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser?.user);
    } else if (error) {
      console.error("error occurred", error);
      // logoutUser();
      return;
    }
    if (isFetchedUserLoading) {
      setIsUserLoading(isFetchedUserLoading);
    }
    if (isFetchedUser) {
      setIsSuccessUser(isFetchedUser);
    }
  }, [error, fetchedUser, isFetchedUserLoading, isFetchedUser, logoutUser]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessTokenState,
        setAccessTokenState,
        isAuthenticated,
        isLoading,
        isSuccessUser,
        setIsLoading,
        isUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};
export default AuthContextProvider;
