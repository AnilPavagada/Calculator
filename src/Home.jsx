import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useCalculatorStore from "./store/useCalculatorStore";
import Navbar from "./Components/Navbar";
import Display from "./Components/Display";
import Button from "./Components/Button";
import DropZone from "./Components/DropZone";
//import { Home } from "lucide-react";

function Home() {
  const input = useCalculatorStore((state) => state.input);
  const undo = useCalculatorStore((state) => state.undo);
  const redo = useCalculatorStore((state) => state.redo);
  const droppedButtons = useCalculatorStore((state) => state.droppedButtons);
  const updateInput = useCalculatorStore((state) => state.updateInput);
  const saveState = useCalculatorStore((state) => state.saveState);
  const clearInput = useCalculatorStore((state) => state.clearInput);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white dark:bg-gray-800 transition-colors">
        <Navbar />

        {/* Centered Container */}
        <div className="flex flex-col items-center mt-6 px-4 sm:px-8 lg:px-0">
          {/* Display */}
          <Display value={input} />

          {/* Drop Zone */}
          <DropZone>
            {droppedButtons.map((btn, index) => (
              <Button key={index} label={btn} onClick={() => updateInput(btn)} />
            ))}
          </DropZone>

          {/* Draggable Buttons */}
          <div className="mt-6 grid grid-cols-4 gap-2 w-full max-w-sm sm:max-w-md md:max-w-lg">
            {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", "C", "=", "+"].map(
              (btn) => (
                <Button key={btn} label={btn} onClick={() => updateInput(btn)} />
              )
            )}
          </div>

          {/* Undo/Redo Buttons */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={undo}
              className="p-2 bg-gray-300 dark:bg-gray-600 rounded"
              disabled={input === "0" && droppedButtons.length === 0}
            >
              Undo
            </button>
            <button
              onClick={redo}
              className="p-2 bg-gray-300 dark:bg-gray-600 rounded"
              disabled={droppedButtons.length === 0}
            >
              Redo
            </button>
          </div>

          {/* Save Button */}
          <div className="mt-4">
            <button onClick={saveState} className="p-2 bg-green-500 text-white rounded">
              Save Layout
            </button>
          </div>
          {/* Clear Input Button */}
          <div className="mt-4">
            <button onClick={clearInput} className="p-2 bg-red-500 text-white rounded">
              Clear Input
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default Home;
