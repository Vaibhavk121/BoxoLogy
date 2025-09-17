import { useState } from "react";
import InputForm from "./Components/InputForm";
import Results from "./Components/Results";
// import TopView from "./Components/ContainerView/TopView";
// import SideView from "./Components/ContainerView/SideView";
// import FrontView from "./Components/ContainerView/FrontView";
import Container3D from "./Components/ContainerView/Container3D";
function App() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        📦 Container Box Fitting Simulator
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <InputForm onResult={setResult} />
        </div>

        <div className="col-span-2 space-y-6">
          <Results result={result} />
          {result && (
            <Container3D
              fitX={result.fitX}
              fitY={result.fitY}
              fitZ={result.fitZ}
              box={result.box}
              container={result.container}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
