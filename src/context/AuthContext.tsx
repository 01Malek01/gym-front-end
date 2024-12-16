import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types";
import { useAuthCheck } from "../hooks/useCheckAuth";
import useGetUserProfile from "../hooks/api/useGetUserProfile";
import { useToast } from "../hooks/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(null);
  const [isSuccessUser, setIsSuccessUser] = useState(null);
  const [accessTokenState, setAccessTokenState] = useState<string | null>(null);
  const { isAuthenticated } = useAuthCheck();
  const { toast } = useToast();
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
  }, []); // Dependency list remains empty
  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser?.user);
    } else if (error) {
      toast({
        title: "Error Fetching profile",
        variant: "destructive",
      });
      console.error(error);
    }
    if (isFetchedUserLoading) {
      setIsUserLoading(isFetchedUserLoading);
    }
    if (isFetchedUser) {
      setIsSuccessUser(isFetchedUser);
    }
  }, [error, fetchedUser, isFetchedUserLoading, isFetchedUser, toast]);
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
