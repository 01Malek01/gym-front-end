import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types";
import { useAuthCheck } from "../hooks/useCheckAuth";
import useGetUserProfile from "../hooks/api/useGetUserProfile";
import useLogout from "../hooks/api/useLogout";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [accessTokenState, setAccessTokenState] = useState<string | null>(null);
  const { isAuthenticated } = useAuthCheck();
  const { logoutUser } = useLogout();
  const {
    user: fetchedUser,
    error,
    isLoading: isFetchingUser,
    refetch:refetchUser
  } = useGetUserProfile();

  const [isLoading, setIsLoading] = useState(false);
  //check for access token in local storage
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
    const updateAuthState = async () => {
      // Set loading state when starting to fetch user
      if (isFetchingUser) {
        setIsUserLoading(true);
        setIsLoading(true);
        return; // Wait for the fetch to complete
      }

      // If we have a user, update the state
      if (fetchedUser) {
        setUser(fetchedUser?.user);
        setIsUserLoading(false);
        setIsLoading(false);
      } 
      // If there was an error
      else if (error) {
        console.error("Error fetching user profile:", error);
        setIsUserLoading(false);
        setIsLoading(false);
        // logoutUser(); // Uncomment if you want to log out on error
      }
      // If no user and no error, but we're not loading anymore
      else if (!isFetchingUser) {
        setIsUserLoading(false);
        setIsLoading(false);
      }
    };

    updateAuthState();
  }, [fetchedUser, error, isFetchingUser, logoutUser]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessTokenState,
        setAccessTokenState,
        isAuthenticated,
        isLoading,
        setIsLoading,
        isUserLoading,
        refetchUser
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
