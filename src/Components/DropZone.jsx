import { useDrop } from "react-dnd";
import useCalculatorStore from "../store/useCalculatorStore";

const DropZone = ({ children }) => {
  const addButton = useCalculatorStore((state) => state.addButton);

  // Using react-dnd's useDrop hook to handle dropped items (buttons)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "button", // Accepts draggable "button" items
    drop: (item) => addButton(item.label), // When a button is dropped, add it to the state
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Determine if an item is currently being dragged over the drop zone
    }),
  }));

  return (
    <div
      ref={drop} // Attach the drop functionality to this div
      className={`w-full max-w-sm sm:max-w-md md:max-w-lg min-h-40 p-4 bg-gray-900 rounded-lg shadow-lg mt-4 
        grid grid-cols-4 gap-2 transition-all ${
          isOver ? "border-2 border-blue-500" : "border-2 border-transparent"
        }`} // Apply a border when an item is being dragged over
    >
      {children} {/* Render children components, i.e., the buttons */}
    </div>
  );
};

export default DropZone;
