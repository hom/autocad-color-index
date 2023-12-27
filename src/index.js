import React from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import { AutocadColorIndex } from "./AutocadColorIndex";

const App = () => {
  return <AutocadColorIndex />;
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
