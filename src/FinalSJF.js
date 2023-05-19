import React, { useState } from 'react';

const SJF = () => {
  //react states and hooks to keep track of data 
  const [processes, setProcesses] = useState([]);
  const [currentProcess, setCurrentProcess] = useState(null);
  const [executionStarted, setExecutionStarted] = useState(false);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [timeline, setTimeline] = useState([]);

  //method to add process to the queue -> this is what runs when you press the add process button
  const addProcess = () => {
    //initializes with these properties
    const newProcess = {
      id: processes.length + 1,
      name: `P${processes.length + 1}`,
      arrival: Math.floor(Math.random() * 7) + 1,
      duration: Math.floor(Math.random() * 10) + 1,
      color: getRandomColor()
    };
    //sets the states/hooks
    setProcesses([...processes, newProcess]);
    setOriginalOrder([...originalOrder, newProcess]);
  };

  //to begin execution process when button is pressed
  const startExecution = () => {
    if (processes.length > 0) {
      setExecutionStarted(true);
      //sjc sorts the processes based on duration
      const sortedProcesses = processes.sort((a, b) => a.duration - b.duration);
      //pushes first process in sort to run process as current process
      setCurrentProcess(sortedProcesses[0]);
      //gets rid of that one ... and so on...
      setProcesses(sortedProcesses.slice(1));
      setTimeline([{ ...sortedProcesses[0], start: 0, end: sortedProcesses[0].duration }]);
    }
  };

  //to continue managing execution process
  const executeProcess = () => {
    if (currentProcess) {
      setTimeout(() => {
        setCurrentProcess(null);
        if (processes.length > 0) {
          //sorts
          const sortedProcesses = processes.sort((a, b) => a.duration - b.duration);
          const nextProcess = sortedProcesses[0];
          setCurrentProcess(nextProcess);
          setProcesses(sortedProcesses.slice(1));
          //this is to provide data to the timeline visualization
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

  //a refresh method that you can use to start a new process sequence
  const refresh = () => {
    setProcesses([]);
    setCurrentProcess(null);
    setExecutionStarted(false);
    setOriginalOrder([]);
    setTimeline([]);
  };

  //creates a 6 letter code for colors to be random
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  //my attempt at trying to get the timeline to have time markers...did it work :P 
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

  //this is the visual component
  return (
    <div>
      <h2>SHORTEST JOB FIRST</h2>
      //button for addProcess
      <button onClick={addProcess} disabled={executionStarted}>
        Add Process
      </button>
      //button that begins execution
      <button onClick={startExecution} disabled={executionStarted}>
        Execute
      </button>
      <button onClick={refresh}>Refresh</button>
      //this displays the process that is on top so to speak
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
      //this displays the processes that haven't run yet
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
      //now after everything has run and stuff we can show the final timeline and original order visualizations
      {executionStarted && executeProcess()}
      {executionStarted && processes.length === 0 && (
        <div>
        //to show what they were in order before/better see what the algorithm did
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
      //display the timeline now using css 
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

export default SJF;

