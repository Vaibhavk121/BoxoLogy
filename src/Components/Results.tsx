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

interface Props {
  result: {
    boxes: Box[];
    container: Container;
    containers: ContainerContents[];
  }| null; 
}

export default function Results({ result }: Props) {
  if (!result) return null;

  const { boxes, container, containers } = result;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Packing Results
      </h2>

      <div className="mb-4 text-gray-700">
        <p>
          <span className="font-medium">Container Size:</span>{" "}
          {container.length} × {container.width} × {container.height}
        </p>
        <p>
          <span className="font-medium">Total Containers Required:</span>{" "}
          {containers.length}
        </p>
      </div>

      {/* Summary of added boxes */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700">Box Types:</h3>
        <ul className="list-disc ml-5 text-gray-700">
          {boxes.map((b, i) => (
            <li key={i}>
              {b.id} — {b.dimensions.length}×{b.dimensions.width}×
              {b.dimensions.height} × Qty {b.quantity}
            </li>
          ))}
        </ul>
      </div>

      {/* Show packing per container */}
      {containers.map((c, ci) => (
        <div
          key={ci}
          className="mb-6 p-3 border rounded-lg shadow-sm bg-gray-50"
        >
          <h4 className="font-semibold text-gray-800 mb-2">
            Container {ci + 1} ({c.boxes.length} boxes)
          </h4>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Box ID</th>
                <th className="p-2 text-left">Orientation</th>
                <th className="p-2 text-left">Position</th>
              </tr>
            </thead>
            <tbody>
              {c.boxes.map((b, bi) => (
                <tr key={bi} className="border-b">
                  <td className="p-2">{b.boxId}</td>
                  <td className="p-2">
                    {b.orientation.length}×{b.orientation.width}×
                    {b.orientation.height}
                  </td>
                  <td className="p-2">
                    ({b.position.x}, {b.position.y}, {b.position.z})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
