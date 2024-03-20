import React from "react";
import Navbar from "@/components/Navbar";
import WidthContainer from "@/components/WidthContainer";
import PromptForm from "@/components/PromptForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <WidthContainer>
        <div>
          <div className="d-flex justify-content-center">
            <h1 className="welcome-text">
              Generate <span className="text-primary">Logos</span> in
              seconds.
            </h1>
          </div>
        </div>
        <PromptForm />
      </WidthContainer>
      <Footer />
    </>
  );
}
