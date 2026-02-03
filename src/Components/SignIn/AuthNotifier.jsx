import { useEffect, useRef } from "react";
import { useSnackbar } from "notistack";
import { useAuth } from "@clerk/clerk-react";

export default function AuthNotifier() {
  const { isSignedIn, userId } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const firstRender = useRef(true); // track first render

  useEffect(() => {
  if (firstRender.current) {
    firstRender.current = false;
    return;
  }

  if (isSignedIn) {
    enqueueSnackbar("Prijava uspješna", {
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
