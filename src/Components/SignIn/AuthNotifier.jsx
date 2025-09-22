import { useEffect, useRef } from "react";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react";

export default function AuthNotifier() {
  const { isSignedIn, userId } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const firstRender = useRef(true); // track first render

  useEffect(() => {
    if (firstRender.current) {
      // first render on page load
      if (isSignedIn) {
        enqueueSnackbar("Dobrodošli nazad!", {
          variant: "default",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
          autoHideDuration: 3000,
        });
      }
      firstRender.current = false; // mark that we’ve handled first render
      return;
    }

    // normal login/logout notifications
    if (isSignedIn) {
      enqueueSnackbar("Prijavljeni ste", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        autoHideDuration: 3000,
      });
    } else if (userId === null) {
      enqueueSnackbar("Trenutno ste prijavljeni kao gost", {
        variant: "info",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        autoHideDuration: 3000,
      });
    }
  }, [isSignedIn, userId, enqueueSnackbar]);

  return null; // no UI
}
