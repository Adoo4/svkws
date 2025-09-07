import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthRedirect() {
  const { isSignedIn, user } = useUser();
   
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  if (!isSignedIn || !user) return;

  const needsProfile = !user.privateMetadata?.shippingAddress;
  const notOnProfilePage = location.pathname !== "/complete-profile";

  if (needsProfile && notOnProfilePage) {
    //navigate("/complete-profile");
  }
}, [isSignedIn, user, navigate, location.pathname]);

  return null; // This component doesn’t render anything
}
