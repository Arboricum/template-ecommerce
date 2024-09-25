import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { AdminContextProvider } from "@/context/adminContext";
import { CartStateContext } from "@/context/StateContext";
import { LoadingContextProvider } from "@/context/loadingContext";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce",
  description: "Un sito ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={inter.className}>
          <AdminContextProvider>
            <LoadingContextProvider>
            <CartStateContext>
              <AuthProvider>
                <Toaster position="bottom-right" />
                <Header />
                {children}
                <Footer />
              </AuthProvider>
            </CartStateContext>
            </LoadingContextProvider>
          </AdminContextProvider>
      </body>
    </html>
  );
}
