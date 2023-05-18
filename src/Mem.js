import React, { useState } from "react";

const MemoryVisualizer = () => {
  const [memory, setMemory] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [blockSizeInput, setBlockSizeInput] = useState("");

  const allocateBlock = (blockSize) => {
    const freeBlockIndex = memory.findIndex(
      (block) => block === null || block >= blockSize
    );
    if (freeBlockIndex !== -1) {
      const newMemory = [...memory];
      const allocatedBlock = newMemory[freeBlockIndex];
      if (allocatedBlock === blockSize) {
        newMemory[freeBlockIndex] = blockSize; // Allocate exact size
      } else {
        // Split the free block into allocated and remaining free block
        newMemory[freeBlockIndex] = blockSize;
        newMemory.splice(freeBlockIndex + 1, 0, allocatedBlock - blockSize);
      }
      setMemory(newMemory);
    } else {
      alert("No free block available for allocation!");
    }
  };

  const deallocateBlock = (index) => {
    const newMemory = [...memory];
    newMemory[index] = null;
    setMemory(newMemory);
  };

  const handleBlockSizeChange = (event) => {
    setBlockSizeInput(event.target.value);
  };

  const addBlock = () => {
    const blockSize = parseInt(blockSizeInput);
    if (!isNaN(blockSize) && blockSize > 0) {
      setBlocks([...blocks, blockSize]);
      setBlockSizeInput("");
    } else {
      alert("Invalid block size!");
    }
  };

  const calculateMemoryUsage = () => {
    const allocatedBlocks = memory.filter((block) => block !== null);
    const usedMemory = allocatedBlocks.reduce(
      (total, block) => total + block,
      0
    );
    return usedMemory;
  };

  const renderMemoryBlocks = () => {
    return memory.map((block, index) => (
      <div
        key={index}
        className={`memory-block ${block === null ? "free" : "allocated"}`}
        style={{ width: `${block * 20}px` }} // Adjust the width based on block size
      >
        {block !== null && (
          <button
            className="deallocate-btn"
            onClick={() => deallocateBlock(index)}
          >
            Deallocate
          </button>
        )}
        {block !== null && <span>{block}</span>}
      </div>
    ));
  };

  const renderBlocks = () => {
    return (
      <div>
        <input
          type="text"
          value={blockSizeInput}
          onChange={handleBlockSizeChange}
        />
        <button onClick={addBlock}>Add Block</button>
        {blocks.map((block, index) => (
          <button key={index} onClick={() => allocateBlock(block)}>
            Allocate {block}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="memory-visualizer">
      <h2>Memory Blocks</h2>
      <div className="memory-container">{renderMemoryBlocks()}</div>
      <h2>Available Blocks</h2>
      <div className="block-container">{renderBlocks()}</div>
      <h2>Memory Remaining</h2>
      <div className="memory-remaining">
        <div
          className="memory-usage"
          style={{ width: `${calculateMemoryUsage()}px` }}
        ></div>
        <div className="memory-total">Total Memory</div>
      </div>
    </div>
  );
};

export default MemoryVisualizer;
