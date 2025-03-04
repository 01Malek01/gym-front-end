import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import { Link } from "react-router-dom"; // For navigation
import {
  Users,
  ShoppingCart,
  Package,
  Tag,
  CreditCard,
  Phone,
  ShieldCheck,
  LogOut,
} from "lucide-react"; // Icons from lucide-react
import { Button } from "../ui/button";

export default function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <Sidebar className="bg-slate-100 h-full">
      {/* Sidebar Header */}
      <SidebarHeader className="text-xl font-bold text-center p-4 border-b border-slate-300">
        Admin Dashboard
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="p-4">
        {/* First Group: Navigation */}
        <SidebarGroup>
          <Link
            to="/admin/manage-users"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-200 transition"
          >
            <Users className="w-5 h-5 text-app_primary" />
            Manage Users
          </Link>
          <Link
            to="/admin/manage-supplements"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-200 transition"
          >
            <Package className="w-5 h-5 text-app_primary" />
            Manage Supplements
          </Link>
          <Link
            to="/admin/manage-offers"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-200 transition"
          >
            <Tag className="w-5 h-5 text-app_primary" />
            Manage Offers
          </Link>
          <Link
            to="/admin/manage-trainers"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-200 transition"
          >
            <ShieldCheck className="w-5 h-5 text-app_primary" />
            Manage Trainers
          </Link>
          <Link
            to="/admin/manage-memberships"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-200 transition"
          >
            <CreditCard className="w-5 h-5 text-app_primary" />
            Manage Memberships
          </Link>
          <Link
            to="/admin/manage-payments"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-200 transition"
          >
            <ShoppingCart className="w-5 h-5 text-app_primary" />
            Manage Payments
          </Link>
          <Link
            to="/admin/contact-support"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-200 transition"
          >
            <Phone className="w-5 h-5 text-app_primary" />
            Contact Support
          </Link>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t border-slate-300 p-4">
        <Button
          variant="outline"
          className="w-full flex items-center gap-3"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5 text-red-500" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
