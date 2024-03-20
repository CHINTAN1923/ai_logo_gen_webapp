import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

const AILogo = require("../../public/AI_APP_Logo.svg");

const Footer = () => {
  return (
    <div>
      <footer className="footer d-flex justify-content-centre align-items-center py-3 mt-4 border-top px-3">
        <div className="copyright-bar">
          Some rights reserved - Made with{" "}
          <span style={{ color: "#e25555" }}>♥</span> Life is short, make it
          sweet.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
