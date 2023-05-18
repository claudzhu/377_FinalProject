import React, { useState } from "react";

const SJF2 = () => {
  const [processes, setProcesses] = useState([]);
  const [timeline, setTimeline] = useState([]);

  const addProcess = () => {
    const newProcess = {
      id: processes.length + 1,
      name: `P${processes.length + 1}`,
      duration: Math.floor(Math.random() * 10) + 1,
      color: getRandomColor()
    };
    setProcesses([...processes, newProcess]);
  };

  const startExecution = () => {
    const sortedProcesses = [...processes].sort(
      (a, b) => a.duration - b.duration
    );

    let currentTime = 0;
    const newTimeline = sortedProcesses.map((process) => {
      const start = currentTime;
      const end = currentTime + process.duration;
      currentTime = end;

      return {
        ...process,
        start,
        end
      };
    });

    setTimeline(newTimeline);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderTimelineRectangles = () => {
    return timeline.map((process) => {
      const rectangleStyle = {
        backgroundColor: process.color,
        width: `${process.duration * 30}px`,
        height: "20px",
        marginRight: "5px"
      };

      return (
        <div
          key={process.id}
          className="timeline-rectangle"
          style={rectangleStyle}
        ></div>
      );
    });
  };

  return (
    <div>
      <h1>CPU Scheduling SJF Visualization</h1>
      <button onClick={addProcess}>Add Process</button>
      <button onClick={startExecution}>Start Execution</button>
      <h1>CPU Scheduling SJN Visualization</h1>
      <button onClick={addProcess} disabled={executionStarted}>
        Add Process
      </button>
      <button onClick={startExecution} disabled={executionStarted}>
        Execute
      </button>
      <button onClick={refresh}>Refresh</button>
      {currentProcess && (
        <>
          <h2>Current Process</h2>
          <p>ID: {currentProcess.id}</p>
          <p>Name: {currentProcess.name}</p>
          <p>Duration: {currentProcess.duration}</p>
        </>
      )}
      <div>
        <h2>Process Queue</h2>
        {processes.map((process) => (
          <div key={process.id}>
            <p>ID: {process.id}</p>
            <p>Name: {process.name}</p>
            <p>Duration: {process.duration}</p>
          </div>
        ))}
      </div>
      <div className="timeline-container">
        <div className="timeline-rectangles">{renderTimelineRectangles()}</div>
      </div>
    </div>
  );
};

export default SJF2;
