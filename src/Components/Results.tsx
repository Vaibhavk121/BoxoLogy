interface Props {
  result: any;
}

export default function Results({ result }: Props) {
  if (!result) return null;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Calculation Results</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p><span className="font-medium">Boxes per Container:</span> {result.boxesPerContainer}</p>
        <p><span className="font-medium">Total Containers Required:</span> {result.totalContainers}</p>
        <p><span className="font-medium">Fit (Length):</span> {result.fitX}</p>
        <p><span className="font-medium">Fit (Width):</span> {result.fitY}</p>
        <p><span className="font-medium">Fit (Height):</span> {result.fitZ}</p>
      </div>
    </div>
  );
}
