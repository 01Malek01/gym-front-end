import React, { createContext, useContext, useState, useEffect } from "react";
import { isTokenValid } from "../helpers/ValidateJWT";
// import useLogout from "./api/useLogout";
import useRefreshToken from "./api/useRefreshToken";

interface checkAuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuth: () => void;
}

const checkAuthContext = createContext<checkAuthContextType | undefined>(
  undefined
);

const CheckAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { refreshAccessToken } = useRefreshToken();
  // const { logoutUser } = useLogout();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuth = async () => {
    //retrieve the access token from local storage
    const accessToken =
      typeof window !== "undefined" && localStorage.getItem("accessToken");

    if (!accessToken) {
      setIsAuthenticated(false);
      return;
    } else if (accessToken && isTokenValid(accessToken)) {
      setIsAuthenticated(true);
      return;
    }

    //if the access token is expired, refresh it
    if (accessToken && !isTokenValid(accessToken)) {
      try {
        const res = await refreshAccessToken();
        const newAccessToken = res?.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        setIsAuthenticated(false);
      }
    }
    // else {
    //   setIsAuthenticated(false);
    // }
  };

  //removed the dependency list from the useEffect hook to avoid infinite loop
  //the effect will run only once when the component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <checkAuthContext.Provider
      value={{ isAuthenticated, checkAuth, setIsAuthenticated }}
    >
      {children}
    </checkAuthContext.Provider>
  );
};

export const useAuthCheck = (): checkAuthContextType => {
  const context = useContext(checkAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default CheckAuthProvider;
