import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases, Query } from "../appwrite/config";
import { databaseId, collectionId } from "../appwrite/config";

const OrderStatus = () => {
  const [usn, setUsn] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!usn.trim()) {
      setError("Please enter a USN to search.");
      return;
    }

    setError("");

    try {
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("usn", usn),
      ]);

      const sortedOrders = response.documents.sort(
        (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch order history. Please try again.");
    }
  };

  const renderStatus = (status) => {
    if (status === false) {
      return (
        <span style={{ color: "#ff4d4d", fontWeight: "bold" }}>
          NOT ACCEPTED
        </span>
      );
    }
    if (status === true) {
      return (
        <span style={{ color: "#4CAF50", fontWeight: "bold" }}>ACCEPTED</span>
      );
    }
    return null;
  };

  const renderCompletion = (completed) => {
    if (completed === false) {
      return (
        <span style={{ color: "#ff9800", fontWeight: "bold" }}>
          ORDER IN PROGRESS
        </span>
      );
    }
    if (completed === true) {
      return (
        <span style={{ color: "#00e676", fontWeight: "bold" }}>
          ORDER COMPLETED. TAKE YOUR ORDER IN SHOP
        </span>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Segoe UI, sans-serif",
        background: "linear-gradient(to bottom right, #082a4e, #000000)",
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      <h2
        style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}
      >
        📦 Order History
      </h2>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Enter USN to search"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            width: "280px",
            backgroundColor: "#0d3c63",
            color: "#fff",
            outline: "none",
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(to right, #0d3c63, #000000)",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
            transition: "0.3s ease",
          }}
        >
          🔍 Search
        </button>
      </div>

      {error && <p style={{ color: "#ff4d4d", fontWeight: "bold" }}>{error}</p>}

      {orders.length > 0 ? (
        <div style={{ marginTop: "20px" }}>
          {orders.map((order, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#0f2c4b",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                borderLeft: "5px solid #00e5ff",
              }}
            >
              <p>
                <strong>USN:</strong> {order.usn}
              </p>
              <p>
                <strong>File Name:</strong> {order["pdf-name"]}
              </p>
              <p>
                <strong>Total Pages:</strong> {order.total_pages}
              </p>
              <p>
                <strong>Number of Copies:</strong> {order.no_of_copies}
              </p>
              <p>
                <strong>Pages to Print:</strong> {order.pages_to_print_from}
              </p>
              <p>
                <strong>Color Pages:</strong> {order.color_pages}
              </p>
              <p>
                <strong>Back to Back:</strong>{" "}
                {order["back-to-back"] ? "Yes" : "No"}
              </p>
              <p>
                <strong>Soft Bind:</strong> {order["soft-bind"] ? "Yes" : "No"}
              </p>
              <p>
                <strong>Total Cost:</strong> ₹{order["total-cost"]}
              </p>
              <p>
                <strong>UTR:</strong> {order.utr}
              </p>
              <p>
                <strong>Status:</strong> {renderStatus(order.status)}
              </p>
              <p>
                <strong>Completion Status:</strong>{" "}
                {renderCompletion(order.completed)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "20px", fontStyle: "italic" }}>
          No orders found for the entered USN.
        </p>
      )}
    </div>
  );
};

export default OrderStatus;
