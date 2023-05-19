import React, { useState } from 'react';

//everything is same as other algorithm components 
//except sorthing algorithm
const SJTC = () => {
  const [processes, setProcesses] = useState([]);
  const [currentProcess, setCurrentProcess] = useState(null);
  const [executionStarted, setExecutionStarted] = useState(false);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [timeline, setTimeline] = useState([]);


  //this sorting algorithm refactors the code from project 3 in c++ to javascript
  function sjf(workload) {
    let complete = [];
    let copy = workload.slice();
    let readyQueue = [];
    let currProcess = null;
    let currTime = 0;

    while (copy.length > 0 || readyQueue.length > 0) {
      // push all arrived processes
      while (copy.length > 0 && copy[0].arrival <= currTime) {
        readyQueue.push(copy[0]);
        copy.shift();
      }

      if (readyQueue.length > 0) {
        currProcess = readyQueue.reduce((min, p) =>
          p.duration < min.duration ? p : min
        ); // find process with the shortest duration

        if (currProcess.first_run === null) {
          currProcess.first_run = currTime;
        }

        currTime += currProcess.duration;
        currProcess.completion = currTime;
        complete.push(currProcess);
        readyQueue.splice(readyQueue.indexOf(currProcess), 1);
      } else {
        currTime++;
      }
    }

    return complete;
  }

  const addProcess = () => {
    const newProcess = {
      id: processes.length + 1,
      name: `P${processes.length + 1}`,
      arrival: Math.floor(Math.random() * 7) + 1,
      duration: Math.floor(Math.random() * 10) + 1,
      first_run: null, 
      completion: null,
      color: getRandomColor()
    };
    setProcesses([...processes, newProcess]);
    setOriginalOrder([...originalOrder, newProcess]);
  };

  const startExecution = () => {
    if (processes.length > 0) {
      setExecutionStarted(true);
      const sortedProcesses = sjf([...processes]);
      setCurrentProcess(sortedProcesses[0]);
      setProcesses(sortedProcesses.slice(1));
      setTimeline([{ ...sortedProcesses[0], start: 0, end: sortedProcesses[0].duration }]);
    }
  };

  const executeProcess = () => {
    if (currentProcess) {
      setTimeout(() => {
        setCurrentProcess(null);
        if (processes.length > 0) {
          const sortedProcesses = sjf([...processes]);
          const nextProcess = sortedProcesses[0];
          setCurrentProcess(nextProcess);
          setProcesses(sortedProcesses.slice(1));
          setTimeline((prevTimeline) => [
            ...prevTimeline,
            {
              ...nextProcess,
              start: prevTimeline[prevTimeline.length - 1].end,
              end: prevTimeline[prevTimeline.length - 1].end + nextProcess.duration
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
    const letters = '0123456789ABCDEF';
    let color = '#';
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
    <div>
      <h2>SHORTEST JOB TO COMPLETION (NP)</h2>
      <button onClick={addProcess} disabled={executionStarted}>
        Add Process
      </button>
      <button onClick={startExecution} disabled={executionStarted}>
        Execute
      </button>
      <button onClick={refresh}>Refresh</button>
      <div>
        {currentProcess && (
          <div>
            <h2>Current Process</h2>
            <p>ID: {currentProcess.id}</p>
            <p>Name: {currentProcess.name}</p>
            <p>Arrival: {currentProcess.arrival}</p>
            <p>Duration: {currentProcess.duration}</p>
          </div>
        )}
      </div>
      <div>
        <h2>Process Queue</h2>
        {processes.map((process) => (
          <div key={process.id}>
            <p>ID: {process.id}</p>
            <p>Name: {process.name}</p>
            <p>Arrival: {process.arrival}</p>
            <p>Duration: {process.duration}</p>
          </div>
        ))}
      </div>
      {executionStarted && executeProcess()}
      {executionStarted && processes.length === 0 && (
        <div>
          <h2>Original Order</h2>
          {originalOrder.map((process) => (
            <div key={process.id}>
              <p>ID: {process.id}</p>
              <p>Name: {process.name}</p>
              <p>Arrival: {process.arrival}</p>
              <p>Duration: {process.duration}</p>
            </div>
          ))}
        </div>
      )}
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
                    width: `${process.duration * 50}px`,
                    marginLeft: `${process.start * 50}px`
                  }}
                >
                  {process.name}
                </div>
              ))}
            </div>
            <div className="timeline-ticks">
              {getTimelineTicks()}
            </div>
            <div>
            <h2>Original Order</h2>
              {originalOrder.map((process) => (
                <div key={process.id}>
                  <p>ID: {process.id}</p>
                  <p>Name: {process.name}</p>
                  <p>Arrival: {process.arrival}</p>
                  <p>Duration: {process.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SJTC;

