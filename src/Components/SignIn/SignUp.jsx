import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const clerkKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkKey) {
  throw new Error('Missing Publishable Key');
}

const queryClient = new QueryClient();

const appearance = {
  elements: {
    card: { backgroundColor: "#262626", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" },
    headerTitle: { color: "#ffffff", fontSize: "24px", fontWeight: "bold", marginBottom: "8px" },
    subtitle: { color: "#ccc", marginBottom: "16px" },
    formFieldInput: { backgroundColor: "#1f1f1f", color: "#ffffff", borderRadius: "6px", padding: "8px 12px" },
    buttonPrimary: { backgroundColor: "#d62d00", color: "#ffffff", borderRadius: "8px", padding: "8px 16px" },
  },
  variables: {
    colorPrimary: "#d62d00",
    colorText: "#ffffff",
    colorBackground: "#262626",
  },
  localization: {
    bs: {
      signIn: {
        title: "Dobrodošli nazad u SVK Bookstore!",
        subtitle: "Molimo prijavite se da nastavite",
        buttonPrimary: "Prijavi se sada",
      },
      signUp: {
        title: "Pridružite se SVK Bookstore danas!",
        subtitle: "Kreirajte svoj nalog da istražujete knjige",
        buttonPrimary: "Kreiraj nalog",
      },
      formField: {
        emailAddress: { placeholder: "Unesite svoju e-poštu" },
        password: { placeholder: "Unesite lozinku" },
      },
    },
  },
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={clerkKey} appearance={appearance}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ClerkProvider>
);
