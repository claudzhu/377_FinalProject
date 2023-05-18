import React, { useState } from "react";

const SJC = () => {
  const [processes, setProcesses] = useState([]);
  const [currentProcess, setCurrentProcess] = useState(null);
  const [executionStarted, setExecutionStarted] = useState(false);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [timeline, setTimeline] = useState([]);

  const addProcess = () => {
    const newProcess = {
      id: processes.length + 1,
      name: `P${processes.length + 1}`,
      duration: Math.floor(Math.random() * 10) + 1,
      start: Math.floor(Math.random() * 8) + 1,
      color: getRandomColor()
    };
    setProcesses([...processes, newProcess]);
    setOriginalOrder([...originalOrder, newProcess]);
  };

  const startExecution = () => {
    if (processes.length > 0) {
      setExecutionStarted(true);
      const sortedProcesses = [...processes].sort(
        (a, b) => a.duration - b.duration
      );
      setCurrentProcess(sortedProcesses[0]);
      setProcesses(sortedProcesses.slice(1));
      setTimeline([
        { ...sortedProcesses[0], start: 0, end: sortedProcesses[0].duration }
      ]);
    }
  };

  const executeProcess = () => {
    if (currentProcess) {
      setTimeout(() => {
        setCurrentProcess(null);
        if (processes.length > 0) {
          const sortedProcesses = [...processes].sort(
            (a, b) => a.duration - b.duration
          );
          const nextProcess = sortedProcesses[0];
          setCurrentProcess(nextProcess);
          setProcesses(sortedProcesses.slice(1));
          setTimeline((prevTimeline) => [
            ...prevTimeline,
            {
              ...nextProcess,
              start:
                prevTimeline.length > 0
                  ? prevTimeline[prevTimeline.length - 1].end
                  : 0,
              end:
                prevTimeline.length > 0
                  ? prevTimeline[prevTimeline.length - 1].end +
                    nextProcess.duration
                  : nextProcess.duration
            }
          ]);
        } else {
          setExecutionStarted(false);
        }
      }, currentProcess.duration * 1000);
    }
  };

  const refresh = () => {
    setProcesses([]);
    setCurrentProcess(null);
    setExecutionStarted(false);
    setOriginalOrder([]);
    setTimeline([]);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getTimelineTicks = () => {
    let ticks = [];
    let currentTime = 0;
    for (const process of timeline) {
      ticks.push(
        <div key={`tick-${process.start}`} className="timeline-tick">
          {currentTime}
        </div>
      );
      currentTime = process.end;
    }
    // Add final tick
    ticks.push(
      <div key={`tick-${currentTime}`} className="timeline-tick">
        {currentTime}
      </div>
    );
    return ticks;
  };

  return (
    <>
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
      {timeline.length > 0 && !executionStarted && (
        <div>
          <h2>Timeline</h2>
          <div className="timeline-container">
            <div className="timeline">
              {timeline.map((process) => (
                <div
                  key={process.id}
                  className="timeline-block"
                  style={{
                    backgroundColor: process.color,
                    width: `${
                      (process.duration / timeline[timeline.length - 1].end) *
                      100
                    }%`,
                    marginLeft: `${
                      (process.start / timeline[timeline.length - 1].end) * 100
                    }%`,
                    marginRight: `${
                      ((timeline[timeline.length - 1].end - process.end) /
                        timeline[timeline.length - 1].end) *
                      100
                    }%`
                  }}
                >
                  {process.name}
                </div>
              ))}
            </div>
            <div className="timeline-ticks">{getTimelineTicks()}</div>
          </div>
        </div>
      )}
      {executionStarted && executeProcess()}
      {executionStarted && processes.length === 0 && currentProcess === null && (
        <>
          <h2>Original Order</h2>
          {originalOrder.map((process) => (
            <div key={process.id}>
              <p>ID: {process.id}</p>
              <p>Name: {process.name}</p>
              <p>Start: {process.start}</p>
              <p>Duration: {process.duration}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default SJC;
