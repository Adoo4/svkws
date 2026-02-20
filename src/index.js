import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hrHR } from "@clerk/localizations";
import { HelmetProvider } from "react-helmet-async";
c

const clerkKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const customHr = {
  ...hrHR,
  signIn: {
    start: {
      title: "Prijava",
      subtitle: "Dobrodošli nazad! Molimo prijavite se za nastavak",
      actionText: "Nemate račun?",
      actionLink: "Registrujte se",
    },
  },
};

if (!clerkKey) {
  throw new Error('Missing Publishable Key');
}

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("CLERK KEY:", clerkKey);


root.render(
  <HelmetProvider>
   <ClerkProvider
  publishableKey={clerkKey}
  
  localization={customHr}
>
      <QueryClientProvider
        client={queryClient}
        appearance={{ variables: { locale: "hr" } }}
      >
        <App />
      </QueryClientProvider>
    </ClerkProvider>
  </HelmetProvider>
);
