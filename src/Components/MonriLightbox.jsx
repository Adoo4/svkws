import { useEffect, useRef } from "react";

export default function MonriLightbox({ paymentData, onSuccess, onClose, onError }) {
  const containerRef = useRef();

  useEffect(() => {
    if (!paymentData) return;

    const existingScript = containerRef.current.querySelector("script");
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.src = "https://ipgtest.monri.com/dist/lightbox.js";
    script.type = "text/javascript";
    script.className = "lightbox-button";

    // Required attributes
    script.setAttribute("data-authenticity-token", paymentData.authenticity_token);
    script.setAttribute("data-order-number", paymentData.order_number);
    script.setAttribute("data-amount", paymentData.amount);
    script.setAttribute("data-currency", paymentData.currency);
    script.setAttribute("data-digest", paymentData.digest);
    script.setAttribute("data-transaction-type", "purchase");
    script.setAttribute("data-language", "ba");
    script.setAttribute("data-order-info", "Book Order");

    Object.entries(paymentData.customer).forEach(([key, value]) => {
      script.setAttribute(`data-${key}`, value);
    });

    containerRef.current.appendChild(script);

    script.onload = () => {
      if (!window.MonriLightbox) return;

      const lightbox = window.MonriLightbox;

      // Attach event listeners
      lightbox.on("success", (resp) => {
        onSuccess?.(resp);
      });
      lightbox.on("close", () => {
        onClose?.();
      });
      lightbox.on("error", (err) => onError?.(err));

      // Open Lightbox
      lightbox.open();
    };

    // Do not remove container immediately — let Lightbox handle cleanup
  }, [paymentData, onSuccess, onClose, onError]);

  return <div ref={containerRef} style={{ display: "none" }} />;
}
