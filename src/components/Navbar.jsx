import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navLinkStyle = (path) => ({
    color: location.pathname === path ? "#FFD700" : "white",
    marginRight: "20px",
    textDecoration: "none",
    position: "relative",
    fontWeight: "500",
    fontSize: "16px",
  });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 999,
        padding: "12px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "rgba(10, 56, 102, 0.3)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Link to="/" style={navLinkStyle("/")}>
        Home
      </Link>
      <Link to="/upload" style={navLinkStyle("/upload")}>
        Upload
      </Link>
      <Link to="/payment" style={navLinkStyle("/payment")}>
        Payment
      </Link>
      <Link to="/order-status" style={navLinkStyle("/order-status")}>
        Order Status
      </Link>

      {/* Hover underline effect */}
      <style>{`
        nav a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background-color: #fff;
          transition: width 0.3s ease;
        }

        nav a:hover::after {
          width: 100%;
        }

        @media (max-width: 600px) {
          nav {
            padding: 10px 20px;
            flex-wrap: wrap;
          }

          nav a {
            margin: 5px 10px;
            font-size: 14px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
