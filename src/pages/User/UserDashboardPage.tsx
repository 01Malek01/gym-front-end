import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/custom-ui/Loader";
import { useEffect } from "react";
import AthleteProfile from "@/components/User/AthleteProfile";
import UserMembershipStatus from "@/components/User/UserMembershipStatus";
import TrainingLog from "@/components/User/TrainingLog";
import PageContainer from "@/components/User/PageContainer";

export default function UserDashboardPage() {
  const {
    user,
    isLoading: isUserLoading,
    isAuthenticated,
    refetchUser,
  } = useAuth();

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);
  // Show loader if user is still loading or if we don't have user data yet
  if (isUserLoading || !isAuthenticated || !user) {
    return <Loader dimensions="h-[150px] w-[150px]" />;
  }

  return (
    <PageContainer>
      {/* Top Section: Orders History & User Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders History Section */}
        <TrainingLog />
        {/* User Profile Section */}
        <AthleteProfile />
      </div>
      {/* Membership Status Section */}
      <UserMembershipStatus />
    </PageContainer>
  );
}
