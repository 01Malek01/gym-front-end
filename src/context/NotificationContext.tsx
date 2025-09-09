'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
 import {io} from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import useGetNotifications from '@/hooks/api/useGetNotifications';
import { RefetchOptions,QueryObserverResult } from '@tanstack/react-query';
type NotificationType = {
  id: string;
  message: string;
  createdAt: string;
 user:string;
};

type NotificationsContextType = {
  notifications:NotificationType[],
  isNotificationsLoading:boolean,
  refetchNotifications: (options?: RefetchOptions) => Promise<QueryObserverResult<NotificationType[],Error>   >,
  isError: boolean,
  isSuccess: boolean,


};  

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export default function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { isAuthenticated,isLoading:isUserLoading,user } = useAuth();
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(false);
const {notifications:notificationsData , isLoading ,error:notificationsError,isSuccess:isNotificationsSuccess,refetch:refetchNotifications} = useGetNotifications();
  useEffect(() => {
    
     if( isLoading){
      setIsNotificationsLoading(true);
     }
    if (notificationsData) {
      setNotifications(notificationsData);
      console.log( notificationsData)
        setIsNotificationsLoading(false);
    } 
    if( !isLoading){
      setIsNotificationsLoading(false);
     }
  }, [notificationsData, isLoading]);

  useEffect(() => {
    if (!user?._id || !isAuthenticated || isUserLoading) return;
    
    // Create socket connection only once
    const socket = io(import.meta.env.VITE_BACK_END || "http://localhost:5000", {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Handle connection
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      if (user?._id) {
        socket.emit("join", user._id);
        console.log("Joining room:", user._id);
      }
    };


    // Handle notifications
    const handleNotification = (data: NotificationType) => {
      setNotifications(prev => [...prev, data]);
      console.log("Received notification:", data);
    };

    // Setup event listeners
    socket.on("connect", handleConnect);
    socket.on("newNotification", handleNotification);

    socket .on("error", (error: unknown) => {
  console.error("Socket error:", error);
});
    // Initial connection
    if (socket.connected && user?._id) {
      socket.emit("join", user._id);
    }

    // Cleanup function
    return () => {
      console.log("Cleaning up socket connection");
      socket.off("connect", handleConnect);
      socket.off("notification", handleNotification);
      socket.off("error", (error: unknown) => {
        console.error("Socket error:", error);
      });
      socket.close();
    };
  }, [user?._id, isAuthenticated, isUserLoading]);

  // Calculate unread count

  const value = {
    notifications,
    isNotificationsLoading,
    refetchNotifications,
    isError:notificationsError,
    isSuccess:isNotificationsSuccess,
    
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}