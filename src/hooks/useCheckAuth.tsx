import React, { createContext, useContext, useState, useEffect } from "react";
import { isTokenValid } from "../helpers/ValidateJWT";
import useLogout from "./api/useLogout";
import useRefreshToken from "./api/useRefreshToken";

interface checkAuthContextType {
  isAuthenticated: boolean | undefined;
  checkAuth: () => void;
}

const checkAuthContext = createContext<checkAuthContextType | undefined>(
  undefined
);

const CheckAuthProvider: React.FC = ({ children }) => {
  const { refreshAccessToken } = useRefreshToken();
  const { logoutUser } = useLogout();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  const checkAuth = async () => {
    const accessToken =
      typeof window !== "undefined" && localStorage.getItem("accessToken");

    if (accessToken && isTokenValid(accessToken)) {
      setIsAuthenticated(true);
      return;
    }

    if (accessToken && accessToken !== undefined) {
      try {
        console.log("Refreshing token...");
        const res = await refreshAccessToken();
        const newAccessToken = res?.accessToken;
        // console.log("new access token status", newAccessToken);

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          setIsAuthenticated(true);
        } else {
          throw new Error("No new access token returned");
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [refreshAccessToken, logoutUser]);

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
