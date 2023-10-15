import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const persons = [{name: "Arto Hellas", number: "0401234564", id: Date.now()}]

ReactDOM.createRoot(document.getElementById("root")).render(<App persons={persons} />);
