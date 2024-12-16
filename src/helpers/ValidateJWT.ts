import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
interface DecodedToken {
  exp?: number; // `exp` is optional in case the token doesn't include it
}

export const isTokenValid = (token: string): boolean => {
  // If no token, return false
  if (!token) return false;

  try {
    // Decode the token
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);

    const currentTime = Date.now() / 1000; // Current time in seconds

    // Check if the token has an expiration date and if it's still valid
    // console.log(
    //   "is access token valid:",
    //   !!decoded.exp && decoded.exp > currentTime
    // );
    // console.log("access token", token, "expires", dayjs.format(decoded.exp));
    return !!decoded.exp && decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token", token, error);
    return false; // Return false for invalid tokens
  }
};
