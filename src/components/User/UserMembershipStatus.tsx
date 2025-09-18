import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function UserMembershipStatus(): React.ReactNode {
  const { user } = useAuth();
  return (
    <div className="bg-zinc-900 border border-yellow-700 rounded-xl shadow-2xl p-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-app_primary-brightTeal uppercase tracking-wider mb-6 pb-2 border-b border-app_secondary-orange">
        Membership Status
      </h2>

      {user?.membershipStatus === "pending" ? (
        <div className="text-center bg-app_neutral-graphite border border-app_secondary-orange rounded-lg p-6 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-app_secondary-orange mb-4">
            (Pending) - Unlock Your Full Potential!
          </p>
          <p className="text-lg text-app_neutral-lightGray/80 mb-6">
            Purchase a membership now to access premium features, exclusive
            classes, and more!
          </p>
          <Link
            to={"/membership"}
            className="bg-app_primary-electricBlue hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 uppercase tracking-wide text-xl inline-block shadow-md hover:shadow-lg"
          >
            Browse Memberships
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className={`bg-gradient-to-br ${
              user?.membershipStatus === "active"
                ? "from-app_primary-dark to-app_primary-electricBlue/80 border-app_primary-electricBlue"
                : "from-app_primary-dark to-app_secondary-crimsonRed/80 border-app_secondary-crimsonRed"
            } text-white rounded-lg p-6 shadow-xl border relative overflow-hidden`}
          >
            {user?.membershipStatus !== "active" && (
              <div className="absolute top-7 -right-4 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 transform translate-x-2 -translate-y-2 rotate-45 w-[7rem] text-center">
                Expired
              </div>
            )}
            <p className="text-2xl font-bold mb-3 uppercase tracking-wide text-app_primary-brightTeal">
              Current Plan:{" "}
              <span className="text-white">{user?.membershipType?.type}</span>
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold text-app_primary-brightTeal/90">
                Status:
              </span>{" "}
              <span
                className={`font-bold ${
                  user?.membershipStatus === "active"
                    ? "text-green-300"
                    : "text-red-300"
                }`}
              >
                {user?.membershipStatus?.toUpperCase()}
              </span>
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold text-app_primary-brightTeal/90">
                Expiration:
              </span>{" "}
              <span
                className={
                  user?.membershipStatus !== "active"
                    ? "line-through text-red-200"
                    : ""
                }
              >
                {user?.membershipExpirationDate &&
                  new Date(
                    user?.membershipExpirationDate as string
                  ).toLocaleDateString()}
              </span>
            </p>
            <p className="text-lg mb-4">
              <span className="font-semibold text-app_primary-brightTeal/90">
                Duration:
              </span>{" "}
              {user?.membershipType?.durationInDays} days
            </p>

            {user?.membershipStatus !== "active" && (
              <Link
                to="/membership"
                className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 text-center"
              >
                Renew Membership
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
