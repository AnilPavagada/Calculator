import { useDrag } from "react-dnd";
import useCalculatorStore from "../store/useCalculatorStore";

const Button = ({ label }) => {
  // Accessing the Zustand store functions for updating input, clearing input, and calculating result
  const updateInput = useCalculatorStore((state) => state.updateInput);
  const calculate = useCalculatorStore((state) => state.calculate);
  const clearInput = useCalculatorStore((state) => state.clearInput);

  // Using react-dnd for drag functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "button",
    item: { label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Handling button clicks for different operations
  const handleClick = () => {
    if (label === "=") {
      calculate(); // Perform the calculation when "=" is clicked
    } else if (label === "C") {
      clearInput(); // Clear the input when "C" is clicked
    } else {
      updateInput(label); // Update the input with the button label when a number/operator is clicked
    }
  };

  return (
    <button
      ref={drag} // Making the button draggable
      onClick={handleClick} // Handling button clicks
      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center text-xl 
        font-semibold rounded-md shadow-md bg-gray-200 dark:bg-gray-700 
        hover:bg-gray-300 dark:hover:bg-gray-600 transition-all 
        ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {label} {/* Display the label on the button */}
    </button>
  );
};

export default Button;
