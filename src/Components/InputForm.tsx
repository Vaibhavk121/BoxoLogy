import { useState } from "react";
import { packBoxesIntoContainers } from "../utils/boxFit";
import type {Container, BoxType, Dimensions } from "../utils/boxFit";

interface PackResult {
  boxes: BoxType[];
  container: Dimensions;
  containers: Container[];
}

interface Props {
  onResult: (result: PackResult) => void;
}

export default function InputForm({ onResult }: Props) {
  const [boxes, setBoxes] = useState<BoxType[]>([]);
  const [currentBox, setCurrentBox] = useState({
    id: "",
    length: 1,
    width: 1,
    height: 1,
    quantity: 1,
    stackable: true,
  });
  const [container, setContainer] = useState<Dimensions>({
    length: 1,
    width: 1,
    height: 1,
  });

  const addBoxType = () => {
    if (!currentBox.id) return;
    setBoxes([
      ...boxes,
      {
        id: currentBox.id,
        dimensions: {
          length: currentBox.length,
          width: currentBox.width,
          height: currentBox.height,
        },
        quantity: currentBox.quantity,
        stackable: currentBox.stackable,
      },
    ]);
    setCurrentBox({ id: "", length: 1, width: 1, height: 1, quantity: 1,stackable:true });
  };

  const handleSubmit = () => {
    const result = packBoxesIntoContainers(boxes, container);
    onResult({ boxes, container, containers: result });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Box & Container Setup
      </h2>

      {/* Container */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Container Dimensions</h3>
        <input
          type="number"
          placeholder="Length"
          className="input"
          onChange={(e) =>
            setContainer({ ...container, length: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Width"
          className="input"
          onChange={(e) =>
            setContainer({ ...container, width: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Height"
          className="input"
          onChange={(e) =>
            setContainer({ ...container, height: Number(e.target.value) })
          }
        />
      </div>

      {/* Add Box Type */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Add Box Type</h3>
        <input
          type="text"
          placeholder="Box ID"
          className="input"
          value={currentBox.id}
          onChange={(e) => setCurrentBox({ ...currentBox, id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Length"
          className="input"
          onChange={(e) =>
            setCurrentBox({ ...currentBox, length: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Width"
          className="input"
          onChange={(e) =>
            setCurrentBox({ ...currentBox, width: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Height"
          className="input"
          onChange={(e) =>
            setCurrentBox({ ...currentBox, height: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          className="input"
          onChange={(e) =>
            setCurrentBox({ ...currentBox, quantity: Number(e.target.value) })
          }
        />

        <div className="flex flex-row justify-between">
          <button
            onClick={addBoxType}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Add Box
          </button>
          <div className="mt-2">
            <label className="mr-2">Stackable?</label>
            <input
              type="checkbox"
              checked={currentBox.stackable}
              onChange={(e) =>
                setCurrentBox({ ...currentBox, stackable: e.target.checked })
              }
            />
          </div>
        </div>
      </div>

      {/* Show added boxes */}
      {boxes.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium">Added Boxes:</h4>
          <ul className="list-disc ml-5">
            {boxes.map((b, i) => (
              <li key={i}>
                {b.id} – {b.dimensions.length}×{b.dimensions.width}×
                {b.dimensions.height} × {b.quantity}(
                {b.stackable ? "Stackable" : "Non-stackable"})
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
      >
        Pack Boxes
      </button>
    </div>
  );
}
