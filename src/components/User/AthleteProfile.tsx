import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import useLogout from "../../hooks/api/useLogout";
export default function AthleteProfile() {
  const { user } = useAuth();
  const { logoutUser } = useLogout();
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <div className="bg-app_neutral-charcoal border border-app_secondary-crimsonRed rounded-xl shadow-2xl p-6 flex flex-col overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-extrabold text-app_primary-brightTeal uppercase tracking-wider mb-6 pb-2 border-b border-app_secondary-crimsonRed">
        Athlete Profile
      </h2>
      <div className="flex-grow text-lg space-y-3">
        <p className="mb-2">
          <span className="font-semibold text-app_primary-electricBlue">
            Name:
          </span>{" "}
          <span className="text-app_neutral-lightGray/90">
            {user?.username}
          </span>
        </p>
        {user?.membershipStatus !== "pending" && (
          <p className="mb-2">
            <span className="font-semibold text-app_primary-electricBlue">
              Membership:
            </span>{" "}
            <span className="text-app_neutral-lightGray/90">
              {user?.membershipType?.type || "None"}
            </span>
          </p>
        )}
        <p className="mb-2">
          <span className="font-semibold text-app_primary-electricBlue">
            Email:
          </span>{" "}
          <span className="text-app_neutral-lightGray/90">{user?.email}</span>
        </p>
        <p className="mb-2">
          <span className="font-semibold text-app_primary-electricBlue">
            Joined:
          </span>{" "}
          <span className="text-app_neutral-lightGray/90">
            {user?.createdAt && dayjs(user.createdAt).format("DD/MM/YYYY")}
          </span>
        </p>
      </div>
      <Button
        className="mt-6 w-full md:w-1/2 lg:w-1/3 bg-app_secondary-brightRed hover:bg-app_secondary-crimsonRed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 uppercase tracking-wide text-lg self-end"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}
