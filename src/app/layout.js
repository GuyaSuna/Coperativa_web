import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { MiembroProvider } from "@/Provider/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <MiembroProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </MiembroProvider>
  );
}
