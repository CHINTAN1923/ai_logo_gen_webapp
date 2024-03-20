import React from "react";
import Navbar from "@/components/Navbar";
import WidthContainer from "@/components/WidthContainer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <WidthContainer>
        <div>
          <div className="d-flex justify-content-center">
            <h1 className="max-w-4xl text-5xl font-bold">Pricing</h1>
          </div>
        </div>
      </WidthContainer>
    </>
  );
}
