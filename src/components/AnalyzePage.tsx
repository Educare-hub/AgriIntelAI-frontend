// // src/AnalyzePage.tsx
// import React, { useState } from "react";

// export default function AnalyzePage() {
//   const [farmName, setFarmName] = useState("");
//   const [data, setData] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleAnalyze = async () => {
//     setLoading(true);
//     setResult("");

//     try {
//       const response = await fetch("http://localhost:5000/api/analyze", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ farmName, data }),
//       });

//       const json = await response.json();
//       setResult(json.result || "No result received.");
//     } catch (err) {
//       console.error(err);
//       setResult("Error connecting to backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "40px", fontFamily: "Arial" }}>
//       <h1>🌾 AgriIntelAI - Farm Data Analyzer</h1>

//       <input
//         type="text"
//         placeholder="Enter farm name"
//         value={farmName}
//         onChange={(e) => setFarmName(e.target.value)}
//         style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
//       />
//       <br />

//       <textarea
//         placeholder="Enter farm data (e.g., Soil moisture 45%, humidity 80%, temperature 26°C)"
//         value={data}
//         onChange={(e) => setData(e.target.value)}
//         style={{ width: "300px", height: "100px", padding: "10px" }}
//       />
//       <br />

//       <button onClick={handleAnalyze} disabled={loading} style={{ marginTop: "10px", padding: "10px 20px" }}>
//         {loading ? "Analyzing..." : "Analyze"}
//       </button>

//       {result && (
//         <div style={{ marginTop: "20px", background: "#f0f0f0", padding: "15px", borderRadius: "8px" }}>
//           <h3>AI Analysis:</h3>
//           <p>{result}</p>
//         </div>
//       )}
//     </div>
//   );
// }
