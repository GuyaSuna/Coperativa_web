"use client";

import { RouterProvider } from '@tanstack/react-router';
import router from "./Routes";
import Header from "../Components/header";
import Footer from "../Components/footer";


const ClientLayout = ({ children }) => {
  if (!Header || !Footer || !router || !RouterProvider) {
    console.error("Error: Uno o más componentes no están definidos correctamente.");
    return <div>Error: Uno o más componentes no están disponibles.</div>;
  }
  
  return (
    <>
      <Header />
      <RouterProvider router={router}>
        {children}
      </RouterProvider>
      <Footer />
    </>
  );
};

export default ClientLayout;
