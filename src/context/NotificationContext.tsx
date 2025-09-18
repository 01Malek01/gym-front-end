"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import useGetNotifications from "@/hooks/api/notifications/useGetNotifications";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import useMarkAllAsRead from "@/hooks/api/notifications/useMarkAllAsRead";
import { useToast } from "@/hooks/use-toast";
import { extractErrorMessage } from "@/lib/utils";

interface Notification {
  id: string;
  message: string;
  createdAt: string;
  user: string;
  isRead?: boolean;
}

interface NotificationsContextType {
  notifications: Notification[];
  isLoading: boolean;
  refetchNotifications: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Notification[], Error>>;
  isError: boolean;
  isSuccess: boolean;
  markAllAsRead: () => Promise<void>;
  error: Error | null;
  isMarkingAsRead: boolean;
  isMarkAllAsReadSuccess: boolean;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export default function NotificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isAuthenticated, isLoading: isUserLoading, user } = useAuth();
  const { toast } = useToast();

  // API hooks
  const {
    notifications: notificationsData,
    isLoading: isNotificationsLoading,
    error: notificationsError,
    isSuccess: isNotificationsSuccess,
    refetch: refetchNotifications,
  } = useGetNotifications();

  const {
    markAllAsRead,
    error: markAllAsReadError,
    isPending: isMarkingAsRead,
    isSuccess: isMarkAllAsReadSuccess,
  } = useMarkAllAsRead();

  // Handle notifications data
  useEffect(() => {
    if (notificationsData) {
      console.log("Notifications data:", notificationsData);
      setNotifications(notificationsData);
    }
  }, [notificationsData]);

  // Handle mark all as read toast notifications
  useEffect(() => {
    if (isMarkAllAsReadSuccess) {
      toast({
        title: "All notifications marked as read",
        variant: "default",
      });
    } else if (markAllAsReadError) {
      toast({
        title: "Failed to mark all notifications as read",
        description: extractErrorMessage(markAllAsReadError),
        variant: "destructive",
      });
    }
  }, [isMarkAllAsReadSuccess, markAllAsReadError, toast]);

  // Socket connection
  useEffect(() => {
    if (!user?._id || !isAuthenticated || isUserLoading) return;

    const socket: Socket = io(
      import.meta.env.VITE_BACK_END || "http://localhost:5000",
      {
        withCredentials: true,
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    );

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      if (user?._id) {
        socket.emit("join", user._id);
        console.log("Joining room:", user._id);
      }
    };

    const handleNotification = (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
      console.log("Received notification:", data);
    };

    const handleError = (error: unknown) => {
      console.error("Socket error:", error);
    };

    // Setup event listeners
    socket.on("connect", handleConnect);
    socket.on("newNotification", handleNotification);
    socket.on("error", handleError);

    // Initial connection
    if (socket.connected && user?._id) {
      socket.emit("join", user._id);
    }

    // Cleanup function
    return () => {
      console.log("Cleaning up socket connection");
      socket.off("connect", handleConnect);
      socket.off("newNotification", handleNotification);
      socket.off("error", handleError);
      socket.disconnect();
    };
  }, [user?._id, isAuthenticated, isUserLoading]);

  // Mark all as read function
  const handleMarkAllAsRead = async (): Promise<void> => {
    try {
      await markAllAsRead();
      setNotifications([]);
      // Optionally refetch notifications after marking as read
      await refetchNotifications();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const contextValue = useMemo(
    (): NotificationsContextType => ({
      notifications,
      isLoading: isNotificationsLoading || isUserLoading,
      refetchNotifications,
      isError: !!notificationsError,
      isSuccess: isNotificationsSuccess,
      markAllAsRead: handleMarkAllAsRead,
      error: markAllAsReadError || notificationsError,
      isMarkingAsRead,
      isMarkAllAsReadSuccess,
    }),
    [
      notifications,
      isNotificationsLoading,
      isUserLoading,
      refetchNotifications,
      notificationsError,
      isNotificationsSuccess,
      markAllAsReadError,
      isMarkingAsRead,
      isMarkAllAsReadSuccess,
      handleMarkAllAsRead,
    ]
  );

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications(): NotificationsContextType {
  const context = useContext(NotificationsContext);

  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }

  return context;
}
