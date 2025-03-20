export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  accessTokenState: string | null;
  setAccessTokenState: (accessToken: string | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  // isSuccessUser: boolean;
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
  membershipType?: {
    _id?: string;
    type: string;
    price: number;
    durationInDays: number;
  };
  membershipExpirationDate?: React.ReactNode;
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
  paymentMethod: "MWALLET" | "CARD" | "CASH";
  paymentStatus: "pending" | "completed" | "failed";
  createdAt: Date;
  __v?: number;
}

export interface Supplement {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt?: Date;
}

export interface Offer {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validFrom: Date;
  validUntil: Date;
  applicableProducts: string[];
}

export interface Trainer {
  _id: string;
  name: string;
  specialization: string;
  bio: string;
  hourlyRate: number;
  availability: string[];
}

export interface Payment
  extends Omit<Order, "paymentMethod" | "paymentStatus"> {
  paymentMethod: "MWALLET" | "CARD" | "CASH";
  paymentStatus: "pending" | "completed" | "failed";
  amount: number;
  transactionDate: Date;
}
