"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const AILogo = require("../../public/AI_APP_Logo.svg");

const Navbar = () => {
  const router = usePathname();
  const isLinkActive = (href: string) => {
    return router === href;
  };

  return (
    <div className="nav-bar">
      <nav className="navbar navbar-expand-lg navbar-light nav-container">
        <Link className="navbar-brand" href="/">
          <Image src={AILogo} loading="eager" width="60" height="60" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li
              className={`nav-item ${isLinkActive("/Explore") ? "active" : ""}`}
            >
              <Link className="nav-link" href="/Explore">
                Explore
              </Link>
            </li>
            <li
              className={`nav-item ${isLinkActive("/Pricing") ? "active" : ""}`}
            >
              <Link className="nav-link" href="/Pricing">
                Pricing
              </Link>
            </li>
            <li className={`nav-item ${isLinkActive("/Docs") ? "active" : ""}`}>
              <Link className="nav-link" href="/Docs">
                Docs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
