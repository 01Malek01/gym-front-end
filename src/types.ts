export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  accessTokenState: string | null;
  setAccessTokenState: (accessToken: string | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isSuccessUser: boolean;
  isUserLoading: boolean;
}
export type User = {
  _id?: string;
  username: string;
  email: string;
  membershipStatus: string;
  role: string;
  gender?: string;
  createdAt?: Date;
};

export type Membership = {
  _id: string;
  type: string;
  price: string;
  durationInDays: number;
};

interface OrderItem {
  itemType: string;
  itemPrice: number;
  quantity: number;
  itemDescription?: string;
  _id: string;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentMethod: "MWALLET" | "CARD" | "CASH"; // Adjust if needed
  paymentStatus: "pending" | "completed" | "failed"; // Adjust if needed
  createdAt: Date;
  __v?: number;
}
