import { useState } from "react";
import InputForm from "./Components/InputForm";
import Results from "./Components/Results";
// import Container3D from "./Components/ContainerView/Container3D";
interface Box {
  id: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  quantity: number;
}

interface Container {
  length: number;
  width: number;
  height: number;
}

interface ContainerContents {
  boxes: {
    boxId: string;
    orientation: {
      length: number;
      width: number;
      height: number;
    };
    position: {
      x: number;
      y: number;
      z: number;
    };
  }[];
}

interface Result {
  boxes: Box[];
  container: Container;
  containers: ContainerContents[];
}

function App() {
  // Set the type of the state to Result | null
  const [result, setResult] = useState<Result | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">📦 Boxology</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <InputForm onResult={setResult} />
        </div>

        <div className="col-span-2 space-y-6">
          <Results result={result} />
          {/* {result && result.boxes.length > 0 && (
            <Container3D
              fitX={2} // calculate based on algorithm
              fitY={2}
              fitZ={2}
              box={result.boxes[0].dimensions} // pick the first box
              container={result.container}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default App;
