import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/home.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Dark overlay with vignette effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%)",
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          color: "#fff",
          padding: "30px",
          borderRadius: "16px",
          maxWidth: "90%",
          width: "500px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          DSATM Printing Shop
        </h1>
        <p
          style={{
            marginBottom: "20px",
            fontStyle: "italic",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          *Disclaimer: This service is meant for DSATM students. Please ensure
          the files are appropriate before uploading.
        </p>
        <ul
          style={{ lineHeight: "1.8", paddingLeft: "20px", fontSize: "15px" }}
        >
          <li>✅ Fast and hassle-free printing</li>
          <li>✅ Budget-friendly student rates</li>
          <li>✅ Online upload, offline pickup</li>
          <li>✅ No queues. Just click & collect</li>
        </ul>
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <button
            style={{
              backgroundColor: "#0A3866",
              color: "white",
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#06294a";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#0A3866";
              e.target.style.transform = "scale(1)";
            }}
            onClick={() => navigate("/upload")}
          >
            ORDER UR PRINT
          </button>
          <button
            style={{
              backgroundColor: "#0A3866",
              color: "white",
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#06294a";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#0A3866";
              e.target.style.transform = "scale(1)";
            }}
            onClick={() => navigate("/order-status")}
          >
            HISTORY
          </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          h1 {
            font-size: 24px !important;
          }
          ul {
            font-size: 14px !important;
          }
          button {
            font-size: 14px !important;
            padding: 10px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
