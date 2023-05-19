import React, { useState } from "react";
import SJF from "./FinalSJF";
import SJTC from "./FinalSJTC";
import FCFS from "./FinalFCFS";

const App = () => {
  //make a form so user can select which algorithm to visualize
  const [algorithm, setAlgorithm] = useState("");
  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const renderAlgorithm = () => {
    switch (algorithm) {
      case "fcfs":
        return <FCFS />;
      case "sjf":
        return <SJF />;
      case "sjtc":
        return <SJTC />;
      default:
        return null;
    }
  };

  //what is outputted --> used to display all the other files to main App.js file
  //calls the algorithm component files
  return (
    <div>
      <h1>CPU Scheduling Algorithms</h1>
      <form>
        <label>
          Select an algorithm:
          <select value={algorithm} onChange={handleAlgorithmChange}>
            <option value="">-- Select Algorithm --</option>
            <option value="fcfs">First-Come, First-Served (FCFS)</option>
            <option value="sjf">Shortest Job First (SJF)</option>
            <option value="sjtc">Shortest Job Time Remaining (SJTR)</option>
          </select>
        </label>
      </form>
      {renderAlgorithm()}
    </div>
  ); 
};

export default App;
