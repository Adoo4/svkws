// Components/AuthNotifier.jsx
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react";

export default function AuthNotifier() {
  const { isSignedIn, userId } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSignedIn) {
      enqueueSnackbar("Uspješno ste se prijavili", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        autoHideDuration: 3000,
      });
    } else if (userId === null) {
      enqueueSnackbar("Uspješno ste se odjavili", {
        variant: "info",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        autoHideDuration: 3000,
      });
    }
  }, [isSignedIn, userId, enqueueSnackbar]);

  return null; // no UI
}