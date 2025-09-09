import { useNotifications } from "@/context/NotificationContext";

export default function Notification() {
    const { notifications, isError, isNotificationsLoading } = useNotifications();

    if (isNotificationsLoading) {
        return (
            <div className="wrapper">
                <div className="container w-96 h-96 bg-slate-300 p-3 m-2 rounded-lg shadow-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <span className="ml-2">Loading notifications...</span>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="wrapper">
                <div className="container w-96 h-96 bg-slate-300 p-3 m-2 rounded-lg shadow-lg flex items-center justify-center">
                    <p className="text-red-600">Error loading notifications</p>
                </div>
            </div>
        );
    }

    return (
        <div className='wrapper'>
            <div className="container w-96 max-h-96 bg-slate-300 p-3 m-2 rounded-lg shadow-lg overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Notifications</h2>
                
                {notifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                        No notifications yet
                    </div>
                ) : (
                    <div className="space-y-2">
                        {notifications.map((notification) => (
                            <div 
                                key={notification.id}
                                className="p-3 bg-white rounded-md shadow-sm hover:shadow transition-shadow"
                            >
                                <p className="text-sm text-gray-800">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(notification.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
