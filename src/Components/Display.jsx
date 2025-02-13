import useCalculatorStore from "../store/useCalculatorStore";

const Display = () => {
  const input = useCalculatorStore((state) => state.input);

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg h-20 bg-black text-white text-right text-3xl p-4 rounded-lg shadow-lg">
      {input}
    </div>
  );
};

export default Display;
