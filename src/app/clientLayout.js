"use client";

import { RouterProvider } from '@tanstack/react-router';
import router from "./Routes";
import Header from "../Components/header";
import Footer from "../Components/footer";

console.log(Header, Footer, router); 

const ClientLayout = ({ children }) => {
  if (!Header || !Footer || !router) {
    return <div>Error: Uno o más componentes no están definidos correctamente.</div>;
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
