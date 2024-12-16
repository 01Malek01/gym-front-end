export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  accessTokenState: string | null;
  setAccessTokenState: (accessToken: string | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
export type User = {
  username: string;
  email: string;
  membershipStatus: string;
  role: string;
  gender?: string;
};

export type Membership = {
  _id: string;
  type: string;
  price: string;
  durationInDays: number;
};
