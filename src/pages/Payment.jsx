import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { databases } from "../appwrite/config"; // Import databases from config.js
import qrImage from "../assets/qr.jpg";
import { databaseId, collectionId } from "../appwrite/config"; // Import database and collection IDs
import "./Payment.css";

const Payment = () => {
  const { state } = useLocation();
  const [utr, setUtr] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const upiId = "dsatm-print.shop@okicici";

  const handleCopy = () => {
    navigator.clipboard
      .writeText(upiId)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleSubmit = async () => {
    if (!utr.trim()) {
      setError("Please enter UTR number.");
      return;
    }

    // UTR validation: must be exactly 12 alphanumeric characters
    const utrRegex = /^[A-Za-z0-9]{12}$/;
    if (!utrRegex.test(utr.trim())) {
      setError(" INVALID UTR....DON'T TRY TO CHEAT :) ");
      return;
    }

    try {
      await databases.createDocument(databaseId, collectionId, "unique()", {
        usn: state.usn,
        total_pages: state.totalPages,
        no_of_copies: state.numCopies,
        pages_to_print_from: `${state.startPage}-${state.endPage}`,
        color_pages: state.colorPages,
        "back-to-back": state.backToBack,
        "soft-bind": state.softBind,
        desc: state.description || "",
        "total-cost": parseInt(state.totalCost),
        utr: utr.trim(),
        "pdf-name": state.fileName || "",
      });
      setSubmitted(true);
      setError("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>

      {state ? (
        <div className="payment-details">
          <p>
            <strong>USN:</strong> {state.usn}
          </p>
          <p>
            <strong>File Name:</strong> {state.fileName}
          </p>
          <p>
            <strong>Total Pages:</strong> {state.totalPages}
          </p>
          <p>
            <strong>Number of Copies:</strong> {state.numCopies}
          </p>
          <p>
            <strong>Pages to Print:</strong> {state.startPage} - {state.endPage}
          </p>
          <p>
            <strong>Color Pages:</strong> {state.colorPages}
          </p>
          <p>
            <strong>Back to Back:</strong> {state.backToBack ? "Yes" : "No"}
          </p>
          <p>
            <strong>Soft Bind:</strong> {state.softBind ? "Yes" : "No"}
          </p>
          <p>
            <strong>Description:</strong> {state.description || "N/A"}
          </p>
          <h3>Total Cost: Rs {state.totalCost}</h3>

          <div className="payment-action">
            <img src={qrImage} alt="QR Code" className="qr-image" />

            <p id="upi-section">
              <strong>UPI ID:</strong> <span id="upi-id">{upiId}</span>
              <button id="copy-btn" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </p>

            <input
              type="text"
              placeholder="Enter UTR Number"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              className="utr-input"
            />
            <button onClick={handleSubmit} className="submit-button">
              Submit
            </button>

            {submitted && (
              <p className="success-message">
                Order submitted successfully! Redirecting to Home...
              </p>
            )}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      ) : (
        <p>No data received.</p>
      )}
    </div>
  );
};

export default Payment;
