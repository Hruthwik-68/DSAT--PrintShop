import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import "./Upload.css";

const Upload = () => {
  const [usn, setUsn] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [numCopies, setNumCopies] = useState(1);
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
  const [allPages, setAllPages] = useState(false);
  const [startColorPage, setStartColorPage] = useState("");
  const [endColorPage, setEndColorPage] = useState("");
  const [allPagesColor, setAllPagesColor] = useState(false);
  const [zeroPagesColor, setZeroPagesColor] = useState(false);
  const [backToBack, setBackToBack] = useState(false);
  const [softBind, setSoftBind] = useState(false);
  const [description, setDescription] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      const reader = new FileReader();
      reader.onload = function () {
        const typedarray = new Uint8Array(this.result);
        pdfjsLib.getDocument({ data: typedarray }).promise.then((pdf) => {
          setTotalPages(pdf.numPages);
          calculateCost(pdf.numPages);
        });
      };
      reader.readAsArrayBuffer(uploadedFile);
    }
  };

  const calculateCost = (pages = totalPages) => {
    let start = allPages ? 1 : parseInt(startPage) || 1;
    let end = allPages ? pages : parseInt(endPage) || pages;

    if (start > pages || end > pages || start < 1 || end < start) {
      setError("Invalid print page numbers");
      return;
    }

    if (!allPagesColor && !zeroPagesColor) {
      const sc = parseInt(startColorPage) || 0;
      const ec = parseInt(endColorPage) || 0;
      if (sc > pages || ec > pages || sc < 1 || ec < sc) {
        setError("Invalid color page numbers");
        return;
      }
    }

    setError("");

    let printPages = end - start + 1;
    let cost = printPages;

    if (allPagesColor) {
      cost += 5 * pages - pages;
    } else if (!zeroPagesColor) {
      const colorPages = Math.max(
        0,
        (parseInt(endColorPage) || 0) - (parseInt(startColorPage) || 0) + 1
      );
      cost += 5 * colorPages;
    }

    cost *= numCopies;
    if (backToBack) cost /= 2;
    if (softBind) cost += 30;

    setTotalCost(cost.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usnRegex = /^1DT\d{2}[A-Z]{2}\d{3}$/;

    // Check if the USN is valid
    if (!usnRegex.test(usn)) {
      setError("Invalid USN format. Correct format: 1DTXXYYZZZ");
      return;
    }

    calculateCost();
    if (error) return;
    navigate("/payment", {
      state: {
        usn,
        fileName,
        totalPages,
        numCopies,
        startPage: allPages ? 1 : startPage,
        endPage: allPages ? totalPages : endPage,
        colorPages: allPagesColor
          ? "All"
          : zeroPagesColor
          ? "None"
          : `${startColorPage}-${endColorPage}`,
        backToBack,
        softBind,
        description,
        totalCost,
      },
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Upload Your File</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Your USN:</label>
          <br />
          <input
            type="text"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Choose Your File:</label>
          <br />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label>Total Pages:</label> <span>{totalPages}</span>
        </div>

        <div>
          <label>Number of Copies:</label>
          <br />
          <input
            type="number"
            value={numCopies}
            onChange={(e) => setNumCopies(parseInt(e.target.value))}
            required
          />
        </div>

        <div>
          <label>Pages to Print:</label>
          <br />
          <input
            type="checkbox"
            checked={allPages}
            onChange={() => setAllPages(!allPages)}
          />{" "}
          Select All
          <br />
          <input
            type="number"
            placeholder="Start Page"
            value={startPage}
            onChange={(e) => setStartPage(e.target.value)}
            disabled={allPages}
          />{" "}
          -
          <input
            type="number"
            placeholder="End Page"
            value={endPage}
            onChange={(e) => setEndPage(e.target.value)}
            disabled={allPages}
          />
        </div>

        <div>
          <label>Color Pages:</label>
          <br />
          <input
            type="checkbox"
            checked={allPagesColor}
            onChange={() => {
              setAllPagesColor(!allPagesColor);
              if (!allPagesColor) setZeroPagesColor(false);
            }}
          />{" "}
          Select All
          <br />
          <input
            type="checkbox"
            checked={zeroPagesColor}
            onChange={() => {
              setZeroPagesColor(!zeroPagesColor);
              if (!zeroPagesColor) setAllPagesColor(false);
            }}
          />{" "}
          No Pages
          <br />
          <input
            type="number"
            placeholder="Start"
            value={startColorPage}
            onChange={(e) => setStartColorPage(e.target.value)}
            disabled={allPagesColor || zeroPagesColor}
          />{" "}
          -
          <input
            type="number"
            placeholder="End"
            value={endColorPage}
            onChange={(e) => setEndColorPage(e.target.value)}
            disabled={allPagesColor || zeroPagesColor}
          />
        </div>

        <div>
          <label>Back to Back:</label>
          <input
            type="checkbox"
            checked={backToBack}
            onChange={(e) => setBackToBack(e.target.checked)}
          />
        </div>

        <div>
          <label>Soft Bind:</label>
          <input
            type="checkbox"
            checked={softBind}
            onChange={(e) => setSoftBind(e.target.checked)}
          />
        </div>

        <div>
          <label>Description (Max 500 chars):</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
        </div>

        <div>
          <strong>Total Cost: ₹{totalCost}</strong>
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}

        <div style={{ marginTop: "10px" }}>
          <button type="button" onClick={() => calculateCost()}>
            Calculate Cost
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
