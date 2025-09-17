import React, { useState } from "react";

interface Dimensions {
  h: number;
  w: number;
  l: number;
}

interface Result {
  boxesPerContainer: number;
  containersNeeded: number;
}

const BoxFittingApp: React.FC = () => {
  const [container, setContainer] = useState<Dimensions>({ h: 0, w: 0, l: 0 });
  const [box, setBox] = useState<Dimensions>({ h: 0, w: 0, l: 0 });
  const [numBoxes, setNumBoxes] = useState<number>(0);
  const [stackable, setStackable] = useState<boolean>(true);
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    let boxesPerContainer = 0;

    if (stackable) {
      boxesPerContainer =
        Math.floor(container.h / box.h) *
        Math.floor(container.w / box.w) *
        Math.floor(container.l / box.l);
    } else {
      boxesPerContainer =
        Math.floor(container.w / box.w) * Math.floor(container.l / box.l);
    }

    const containersNeeded =
      boxesPerContainer > 0
        ? Math.ceil(numBoxes / boxesPerContainer)
        : Infinity; // Avoid divide by zero

    setResult({
      boxesPerContainer,
      containersNeeded,
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>📦 Box Fitting Calculator</h2>

      {/* Container Inputs */}
      <h4>Container Size (H × W × L)</h4>
      <input
        type="number"
        placeholder="Height"
        onChange={(e) =>
          setContainer({ ...container, h: Number(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Width"
        onChange={(e) =>
          setContainer({ ...container, w: Number(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Length"
        onChange={(e) =>
          setContainer({ ...container, l: Number(e.target.value) })
        }
      />

      {/* Box Inputs */}
      <h4>Box Size (H × W × L)</h4>
      <input
        type="number"
        placeholder="Height"
        onChange={(e) => setBox({ ...box, h: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Width"
        onChange={(e) => setBox({ ...box, w: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Length"
        onChange={(e) => setBox({ ...box, l: Number(e.target.value) })}
      />

      {/* Number of Boxes */}
      <h4>Total Number of Boxes</h4>
      <input
        type="number"
        placeholder="Number of boxes"
        onChange={(e) => setNumBoxes(Number(e.target.value))}
      />

      {/* Stackable Toggle */}
      <h4>Stackable?</h4>
      <label>
        <input
          type="checkbox"
          checked={stackable}
          onChange={() => setStackable(!stackable)}
        />{" "}
        Yes
      </label>

      <br />
      <button onClick={calculate} style={{ marginTop: "10px" }}>
        Calculate
      </button>

      {/* Results */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Results</h3>
          <p>Boxes per Container: {result.boxesPerContainer}</p>
          <p>
            Containers Needed:{" "}
            {result.containersNeeded === Infinity
              ? "Invalid box/container dimensions"
              : result.containersNeeded}
          </p>
        </div>
      )}
    </div>
  );
};

export default BoxFittingApp;
