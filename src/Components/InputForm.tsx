import { useState } from "react";
import { calculateFit } from "../utils/boxFit";

interface Props {
  onResult: (result: any) => void;
}

export default function InputForm({ onResult }: Props) {
  const [box, setBox] = useState({ length: 1, width: 1, height: 1 });
  const [container, setContainer] = useState({ length: 1, width: 1, height: 1 });
  const [numBoxes, setNumBoxes] = useState(1);
  const [stackable, setStackable] = useState(true);

  const handleSubmit = () => {
    const result = calculateFit(box, container, numBoxes, stackable);
    onResult({ box, container, numBoxes, stackable, ...result });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "box" | "container"
  ) => {
    const { name, value } = e.target;
    if (type === "box") setBox({ ...box, [name]: Number(value) });
    else setContainer({ ...container, [name]: Number(value) });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Box & Container Setup</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Box Dimensions */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Box Dimensions</h3>
          <input name="length" type="number" placeholder="Length"
            className="input" onChange={(e) => handleChange(e, "box")} />
          <input name="width" type="number" placeholder="Width"
            className="input" onChange={(e) => handleChange(e, "box")} />
          <input name="height" type="number" placeholder="Height"
            className="input" onChange={(e) => handleChange(e, "box")} />
        </div>

        {/* Container Dimensions */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Container Dimensions</h3>
          <input name="length" type="number" placeholder="Length"
            className="input" onChange={(e) => handleChange(e, "container")} />
          <input name="width" type="number" placeholder="Width"
            className="input" onChange={(e) => handleChange(e, "container")} />
          <input name="height" type="number" placeholder="Height"
            className="input" onChange={(e) => handleChange(e, "container")} />
        </div>
      </div>

      <div className="mt-4">
        <input type="number" placeholder="Number of Boxes"
          className="input" onChange={(e) => setNumBoxes(Number(e.target.value))} />
      </div>

      <div className="mt-3">
        <label className="flex items-center gap-2 text-gray-700">
          <input type="checkbox" checked={stackable} onChange={() => setStackable(!stackable)} />
          Stackable?
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
      >
        Calculate
      </button>
    </div>
  );
}
