import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useLogout from "../../hooks/api/useLogout";
import { Button } from "../ui/button";
import {
  Users,
  Package,
  Percent,
  Dumbbell,
  Wallet,
  MessageSquare,
  IdCard,
  UserPlus,
  LogOut,
  ShoppingBag,
  Settings,
} from "lucide-react";

export default function AdminDashboard() {
  const { logoutUser } = useLogout();
  const { user } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  const actions = [
    {
      title: "Manage Users",
      icon: <Users size={50} />,
      href: "/admin/manage-users",
    },
    {
      title: "Manage Supplements",
      icon: <Package size={50} />,
      href: "/admin/manage-supplements",
    },
    {
      title: "Manage Offers",
      icon: <Percent size={50} />,
      href: "/admin/manage-offers",
    },
    {
      title: "Manage Trainers",
      icon: <Dumbbell size={50} />,
      href: "/admin/manage-trainers",
    },
    {
      title: "Manage Memberships",
      icon: <IdCard size={50} />,
      href: "/admin/manage-memberships",
    },
    {
      title: "Manage Payments",
      icon: <Wallet size={50} />,
      href: "/admin/manage-payments",
    },
    {
      title: "Manage Orders",
      icon: <ShoppingBag size={50} />,
      href: "/admin/manage-orders",
    },
    {
      title: "Contact Support",
      icon: <MessageSquare size={50} />,
      href: "/contact-support",
    },
    {
      title: "Add New Admin",
      icon: <UserPlus size={50} />,
      href: "/admin/add-new-admin",
    },
    {
      title: "Settings",
      icon: <Settings size={50} />,
      href: "/admin/settings",
    },
  ];

  return (
    <div className="admin-wrapper bg-gray-100 h-screen">
      <div className="admin-container max-w-7xl mx-auto p-6">
        {/* Admin Header */}
        <div className="admin-header flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-app_secondary-orange">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-600">Welcome, {user?.username}</p>
          </div>
          <Button
            className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>

        {/* Admin Actions */}
        <div className="admin-actions grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <Link key={index} to={action.href}>
              <div className="admin-action h-40 rounded-lg bg-white shadow-md hover:shadow-lg hover:bg-slate-200 transition-shadow flex flex-col items-center justify-center gap-4 text-center cursor-pointer">
                {action.icon}
                <span className="text-lg font-medium text-gray-700">
                  {action.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
