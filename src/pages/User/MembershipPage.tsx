import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useBuyMembership from "../../hooks/api/useBuyMembership";
import Loader from "../../components/custom-ui/Loader";

export default function MembershipPage() {
  const params = useParams();
  const membershipId = params.membershipId;
  const { buyMembership, error, isError, isPending } = useBuyMembership();
  const [checkOutUrl, setCheckOutUrl] = useState<string | null>(null);
  useEffect(() => {
    buyMembership().then((data) => {
      setCheckOutUrl(data?.checkout_url);
    });
  }, [buyMembership, isError, checkOutUrl]);

  return (
    <div>
      <h1 className="text-white">Membership Page</h1>
      <p className="text-white">Membership ID: {membershipId}</p>
      <p className="text-white">We are processing your payment</p>
      {isPending && <Loader dimensions="w-50 h-50" />}
      {/* {isError && <p className="text-red-500">Error: {error}</p>} */}
      {checkOutUrl && (
        <Link to={checkOutUrl}>
          <button className=" p-5 border-none bg-slate-500 text-white rounded-md transition hover:bg-slate-800">
            Proceed to Payment
          </button>
        </Link>
      )}
    </div>
  );
}
